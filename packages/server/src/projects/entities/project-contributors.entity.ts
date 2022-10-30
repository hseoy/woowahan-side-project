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
  @JoinColumn({ name: 'project_id' })
  project: Project;
}
