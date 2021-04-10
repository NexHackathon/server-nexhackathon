import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowProfileUseCase } from './ShowProfileUseCase';

export class ShowProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const showProfileUseCase = container.resolve(ShowProfileUseCase);

    const user = await showProfileUseCase.execute({
      user_id: id,
    });

    return response.json(classToClass(user));
  }
}
