import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateTeamUseCase } from './CreateTeamUseCase';

export class CreateTeamController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { name, description, users_email } = request.body;

    const createTeamUseCase = container.resolve(CreateTeamUseCase);

    await createTeamUseCase.execute({
      name,
      description,
      user_id: id,
      users_email,
    });

    return response.status(201).send();
  }
}
