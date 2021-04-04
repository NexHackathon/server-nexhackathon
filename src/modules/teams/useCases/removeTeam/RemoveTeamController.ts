import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RemoveTeamUseCase } from './RemoveTeamUseCase';

export class RemoveTeamController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const removeTeamUseCase = container.resolve(RemoveTeamUseCase);

    await removeTeamUseCase.execute({
      user_id: id,
    });

    return response.status(204).send();
  }
}
