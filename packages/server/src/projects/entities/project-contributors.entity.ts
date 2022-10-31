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

  @Column({ nullable: true })
  contributorId?: number;

  @Column({
    type: 'varchar',
    length: 45,
    nullable: true,
  })
  contributorName?: string;

  @Column()
  projectId: number;

  @ManyToOne(() => Project, (project) => project.id, { nullable: false })
  @JoinColumn()
  project: Project;
}
