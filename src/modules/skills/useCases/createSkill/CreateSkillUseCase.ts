import { inject, injectable } from 'tsyringe';

import { Skill } from '@modules/skills/infra/typeorm/entities/Skill';
import {
  ICreateSkillDTO,
  ISkillsRepository,
} from '@modules/skills/repositories/ISkillsRepository';
import AppError from '@shared/errors/AppError';

@injectable()
export class CreateSkillUseCase {
  constructor(
    @inject('SkillsRepository')
    private skillsRepository: ISkillsRepository,
  ) {}

  async execute({ name }: ICreateSkillDTO): Promise<Skill> {
    const skillsExists = await this.skillsRepository.findByName(name);

    if (skillsExists) {
      throw new AppError('Skill already exists!');
    }

    const skill = await this.skillsRepository.create({
      name,
    });

    return skill;
  }
}
