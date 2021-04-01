import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RankUsersUseCase } from './RankUsersUseCase';

export class RankUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const rankUsersUseCase = container.resolve(RankUsersUseCase);

    const users = await rankUsersUseCase.execute();

    return response.json(users);
  }
}
