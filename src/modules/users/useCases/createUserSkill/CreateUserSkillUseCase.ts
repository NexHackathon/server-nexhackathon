import { inject, injectable } from 'tsyringe';

import { ISkillsRepository } from '@modules/skills/repositories/ISkillsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

interface ISkills {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

interface IRequest {
  user_id: string;
  skills_id: string[];
}

interface IResponse {
  id: string;
  name: string;
  skills: ISkills[];
}

@injectable()
export class CreateUserSkillUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('SkillsRepository')
    private skillsRepository: ISkillsRepository,
  ) {}

  async execute({ user_id, skills_id }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(user_id);

    const skills = await this.skillsRepository.findByIds(skills_id);

    user.skills = skills;

    await this.usersRepository.save(user);

    const userResponse = {
      id: user.id,
      name: user.name,
      skills,
    } as IResponse;

    return userResponse;
  }
}
