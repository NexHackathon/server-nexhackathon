import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { JoinTeamUseCase } from './JoinTeamUseCase';

export class JoinTeamController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const { token, team_id } = request.body;

    const joinTeamUseCase = container.resolve(JoinTeamUseCase);

    await joinTeamUseCase.execute({
      user_id: id,
      token,
      team_id,
    });

    return response.status(204).send();
  }
}
