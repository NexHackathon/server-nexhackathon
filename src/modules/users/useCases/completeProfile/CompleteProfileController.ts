import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CompleteProfileUseCase } from './CompleteProfileUseCase';

export class CompleteProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { headline, description, linkedin, github, instagram } = request.body;

    const completeProfileUseCase = container.resolve(CompleteProfileUseCase);

    const user = await completeProfileUseCase.execute({
      user_id: id,
      headline,
      description,
      linkedin,
      github,
      instagram,
    });

    return response.json(classToClass(user));
  }
}
