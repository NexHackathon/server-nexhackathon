import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      school,
      date_of_birth,
      email,
      password,
      invite_token,
    } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({
      name,
      school,
      date_of_birth,
      email,
      password,
      invite_token,
    });

    return response.status(201).json(classToClass(user));
  }
}
