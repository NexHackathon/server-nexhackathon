import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListTeamsUseCase } from './ListTeamsUseCase';

export class ListTeamsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listTeamsUseCase = container.resolve(ListTeamsUseCase);

    const teams = await listTeamsUseCase.execute();

    return response.json(classToClass(teams));
  }
}
