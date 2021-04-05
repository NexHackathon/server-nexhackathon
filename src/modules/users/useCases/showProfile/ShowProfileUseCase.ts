import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
}

interface ISkills {
  id: string;
  name: string;
}

interface IResponse {
  id: string;
  name: string;
  email: string;
  profile_image: string;
  profile_image_url: () => string;
  school: string;
  headline: string;
  description: string;
  linkedin: string;
  github: string;
  instagram: string;
  skills: ISkills[];
}

@injectable()
export class ShowProfileUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(user_id);

    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      profile_image: user.profile_image,
      profile_image_url: user.getAvatar_url,
      school: user.school,
      headline: user.headline,
      description: user.description,
      linkedin: user.linkedin,
      github: user.github,
      instagram: user.instagram,
      skills: user.skills,
    } as IResponse;

    return userResponse;
  }
}
