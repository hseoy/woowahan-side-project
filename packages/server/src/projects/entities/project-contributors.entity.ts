import { User } from '@/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class ProjectContributor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'contributor_id', nullable: true })
  contributorId?: number;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  @JoinColumn({ name: 'contributor_id' })
  contributor?: User;

  @Column({
    name: 'contributor_name',
    type: 'varchar',
    length: 45,
    nullable: true,
  })
  contributorName?: string;

  @Column({ name: 'project_id' })
  projectId: number;

  @ManyToOne(() => Project, (project) => project.id, { nullable: false })
  project: Project;
}
