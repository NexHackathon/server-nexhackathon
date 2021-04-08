import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateProfileUseCase } from './UpdateProfileUseCase';

export class UpdateProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const {
      name,
      email,
      school,
      date_of_birth,
      headline,
      old_password,
      password,
    } = request.body;

    const updateProfileUseCase = container.resolve(UpdateProfileUseCase);

    const user = await updateProfileUseCase.execute({
      user_id: id,
      name,
      email,
      school,
      date_of_birth,
      headline,
      old_password,
      password,
    });

    return response.json(classToClass(user));
  }
}
