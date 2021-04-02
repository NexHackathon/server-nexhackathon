import { getRepository, Repository } from 'typeorm';

import {
  ICreateSkillDTO,
  ISkillsRepository,
} from '@modules/skills/repositories/ISkillsRepository';

import { Skill } from '../entities/Skill';

export class SkillsRepository implements ISkillsRepository {
  private repository: Repository<Skill>;

  constructor() {
    this.repository = getRepository(Skill);
  }

  async create({ name }: ICreateSkillDTO): Promise<Skill> {
    const skill = this.repository.create({
      name,
    });

    await this.repository.save(skill);

    return skill;
  }
}
