import path from 'path';
import { inject, injectable } from 'tsyringe';

import { Team } from '@modules/teams/infra/typeorm/entities/Team';
import { ITeamsRepository } from '@modules/teams/repositories/ITeamsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  description: string;
  user_id: string;
  users_email: string[];
}

@injectable()
export class CreateTeamUseCase {
  constructor(
    @inject('TeamsRepository')
    private teamsRepository: ITeamsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  async execute({
    name,
    description,
    user_id,
    users_email,
  }: IRequest): Promise<Team> {
    const user = await this.usersRepository.findById(user_id);

    if (user.team_id) {
      throw new AppError('You are already in a team!');
    }

    if (users_email.length > 4) {
      throw new AppError('You can only invite four users.');
    }

    const users = await Promise.all(
      users_email.map(async user_email => {
        const checkUser = await this.usersRepository.findByEmail(user_email);

        if (!checkUser) {
          throw new AppError(
            `User with email: '${user_email}' does not exists.`,
          );
        }

        if (checkUser.email === user.email) {
          throw new AppError('You cannot invite yourself!');
        }

        if (checkUser.team_id) {
          throw new AppError(
            `User with email: '${user_email}' is already on a team.`,
          );
        }

        return checkUser;
      }),
    );

    const team = this.teamsRepository.create({
      name,
      description,
    });

    user.team_id = team.id;

    user.inserted_team_date = new Date();

    const inviteTeamTemplate = path.resolve(
      __dirname,
      '..',
      '..',
      'views',
      'invite_team.hbs',
    );

    await Promise.all(
      users.map(async user => {
        await this.mailProvider.sendMail({
          to: {
            name: user.name,
            email: user.email,
          },
          subject: `[HackaNex] Convite para ingressar ao time ${team.name}`,
          templateData: {
            file: inviteTeamTemplate,
            variables: {
              name: user.name,
              team_name: team.name,
              team_id: team.id,
              token: 'token-test',
            },
          },
        });
      }),
    );

    await this.teamsRepository.saveTrx(team, user);

    return team;
  }
}
