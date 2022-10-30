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

  @Column({ name: 'contributorId', nullable: true })
  contributorId?: number;

  @Column({
    name: 'contributorName',
    type: 'varchar',
    length: 45,
    nullable: true,
  })
  contributorName?: string;

  @Column({ name: 'projectId' })
  projectId: number;

  @ManyToOne(() => Project, (project) => project.id, { nullable: false })
  @JoinColumn({ name: 'projectId' })
  project: Project;
}
