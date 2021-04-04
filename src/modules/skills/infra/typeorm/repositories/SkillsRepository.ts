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

  async findByName(name: string): Promise<Skill | undefined> {
    const skill = await this.repository.findOne({ where: { name } });

    return skill;
  }

  async list(): Promise<Skill[]> {
    const skills = await this.repository.find();

    return skills;
  }

  async findByIds(ids: string[]): Promise<Skill[]> {
    const skills = await this.repository.findByIds(ids);

    return skills;
  }
}
