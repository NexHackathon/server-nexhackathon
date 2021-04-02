import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserSkillUseCase } from './CreateUserSkillUseCase';

export class CreateUserSkillController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { skills_id } = request.body;

    const createUserSkillUseCase = container.resolve(CreateUserSkillUseCase);

    const skills = await createUserSkillUseCase.execute({
      user_id: id,
      skills_id,
    });

    return response.json(skills);
  }
}
