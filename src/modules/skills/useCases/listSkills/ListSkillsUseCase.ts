import { inject, injectable } from 'tsyringe';

import { Skill } from '@modules/skills/infra/typeorm/entities/Skill';
import { ISkillsRepository } from '@modules/skills/repositories/ISkillsRepository';

@injectable()
export class ListSkillsUseCase {
  constructor(
    @inject('SkillsRepository')
    private skillsRepository: ISkillsRepository,
  ) {}

  async execute(): Promise<Skill[]> {
    const skills = await this.skillsRepository.list();

    return skills;
  }
}
