import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSkillUseCase } from './CreateSkillUseCase';

export class CreateSkillController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createSkillUseCase = container.resolve(CreateSkillUseCase);

    const skill = await createSkillUseCase.execute({
      name,
    });

    return response.status(201).json(skill);
  }
}
