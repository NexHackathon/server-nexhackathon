import path from 'path';
import { inject, injectable } from 'tsyringe';

import { Team } from '@modules/teams/infra/typeorm/entities/Team';
import { ITeamsRepository } from '@modules/teams/repositories/ITeamsRepository';
import { ITeamUsersTokenRepository } from '@modules/teams/repositories/ITeamUsersTokenRepository';
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

    @inject('TeamUsersTokenRepository')
    private teamUsersTokenRepository: ITeamUsersTokenRepository,
  ) {}

  async execute({
    name,
    description,
    user_id,
    users_email,
  }: IRequest): Promise<Team> {
    const authenticatedUser = await this.usersRepository.findById(user_id);

    if (authenticatedUser.team_id) {
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

        if (checkUser.email === authenticatedUser.email) {
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

    authenticatedUser.team_id = team;

    authenticatedUser.inserted_team_date = new Date();

    await this.teamsRepository.saveTrx(team, authenticatedUser);

    const inviteTeamTemplate = path.resolve(
      __dirname,
      '..',
      '..',
      'views',
      'invite_team.hbs',
    );

    await Promise.all(
      users.map(async user => {
        const { token } = await this.teamUsersTokenRepository.generate({
          team_id: team.id,
          user_id: user.id,
        });

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
              user_name: authenticatedUser.name,
              team_name: team.name,
              token,
            },
          },
        });
      }),
    );

    return team;
  }
}
