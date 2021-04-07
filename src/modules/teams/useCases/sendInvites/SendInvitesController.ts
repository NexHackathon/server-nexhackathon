import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendInvitesUseCase } from './SendInvitesUseCase';

export class SendInvitesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { users_email } = request.body;

    const sendInvitesUseCase = container.resolve(SendInvitesUseCase);

    await sendInvitesUseCase.execute({
      user_id: id,
      users_email,
    });

    return response.status(201).send();
  }
}
