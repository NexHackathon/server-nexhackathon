import path from 'path';
import { inject, injectable } from 'tsyringe';

import { ITeamsRepository } from '@modules/teams/repositories/ITeamsRepository';
import { ITeamUsersTokenRepository } from '@modules/teams/repositories/ITeamUsersTokenRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  users_email: string[];
}

@injectable()
export class SendInvitesUseCase {
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
  async execute({ user_id, users_email }: IRequest): Promise<void> {
    const authenticatedUser = await this.usersRepository.findById(user_id);

    if (!authenticatedUser.team_id) {
      throw new AppError('You are not on team!');
    }

    const team = await this.teamsRepository.findById(
      authenticatedUser.team_id.id,
    );

    if (team.users.length === 5) {
      throw new AppError('This team is full');
    }

    if (team.users.length + users_email.length > 5) {
      throw new AppError(`You can only send ${5 - team.users.length} invites`);
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
  }
}
