import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Skill } from '@modules/skills/infra/typeorm/entities/Skill';
import { Team } from '@modules/teams/infra/typeorm/entities/Team';

@Entity('users')
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  school: string;

  @Column()
  date_of_birth: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  isAdmin: boolean;

  @Column()
  profile_image: string;

  @Column()
  headline: string;

  @Column()
  description: string;

  @Column()
  points: number;

  @Column()
  linkedin: string;

  @Column()
  github: string;

  @Column()
  instagram: string;

  @ManyToOne(() => Team, team => team.users)
  @JoinColumn({ name: 'team_id' })
  team_id: Team;

  @ManyToMany(() => Skill)
  @JoinTable({
    name: 'skills_users',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'skill_id' }],
  })
  skills: Skill[];

  @Column()
  inserted_team_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'profile_image_url' })
  getAvatar_url(): string | null {
    return this.profile_image
      ? `${process.env.APP_API_URL}/files/${this.profile_image}`
      : null;
  }

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
