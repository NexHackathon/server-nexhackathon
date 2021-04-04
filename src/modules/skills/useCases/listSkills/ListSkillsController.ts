import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListSkillsUseCase } from './ListSkillsUseCase';

export class ListSkillsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listSkillsUseCase = container.resolve(ListSkillsUseCase);

    const skills = await listSkillsUseCase.execute();

    return response.json(skills);
  }
}
