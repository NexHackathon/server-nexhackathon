import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { LeaveTeamUseCase } from './LeaveTeamUseCase';

export class LeaveTeamController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const leaveTeamUseCase = container.resolve(LeaveTeamUseCase);

    await leaveTeamUseCase.execute({
      user_id: id,
    });

    return response.status(200).send();
  }
}
