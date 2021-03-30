import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateTeamUseCase } from './CreateTeamUseCase';

export class CreateTeamController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createTeamUseCase = container.resolve(CreateTeamUseCase);

    await createTeamUseCase.execute({
      name,
      description,
    });

    return response.status(201).send();
  }
}
