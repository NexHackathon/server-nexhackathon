import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserProfileImageUseCase } from './UpdateUserProfileImageUseCase';

export class UpdateUserProfileImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateUserAvatarUseCase = container.resolve(
      UpdateUserProfileImageUseCase,
    );

    const user = await updateUserAvatarUseCase.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    return response.json(classToClass(user));
  }
}
