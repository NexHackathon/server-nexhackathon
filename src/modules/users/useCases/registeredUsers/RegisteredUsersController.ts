import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RegisteredUsersUseCase } from './RegisteredUsersUseCase';

export class RegisteredUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const registeredUsersUseCase = container.resolve(RegisteredUsersUseCase);

    const usersCount = await registeredUsersUseCase.execute();

    return response.json(usersCount);
  }
}
