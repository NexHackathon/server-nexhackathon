import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindUserUseCase } from './FindUserUseCase';

export class FindUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findUserUseCase = container.resolve(FindUserUseCase);

    const user = await findUserUseCase.execute({
      user_id: id,
    });

    return response.json(classToClass(user));
  }
}
