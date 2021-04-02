import { inject, injectable } from 'tsyringe';

import { ISkillsRepository } from '@modules/skills/repositories/ISkillsRepository';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  skills_id: string[];
}

@injectable()
export class CreateUserSkillUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('SkillsRepository')
    private skillsRepository: ISkillsRepository,
  ) {}

  async execute({ user_id, skills_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    const skills = await this.skillsRepository.findByIds(skills_id);

    user.skills = skills;

    await this.usersRepository.save(user);

    return user;
  }
}
