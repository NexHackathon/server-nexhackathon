import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserProfileImageUseCase } from './UpdateUserProfileImageUseCase';

export class UpdateUserProfileImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateUserAvatarUseCase = container.resolve(
      UpdateUserProfileImageUseCase,
    );

    await updateUserAvatarUseCase.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    return response.status(201).send();
  }
}
