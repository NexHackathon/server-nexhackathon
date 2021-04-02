import { Skill } from '../infra/typeorm/entities/Skill';

export interface ICreateSkillDTO {
  name: string;
}

export interface ISkillsRepository {
  create(data: ICreateSkillDTO): Promise<Skill>;
  findByName(name: string): Promise<Skill | undefined>;
  list(): Promise<Skill[]>;
}
