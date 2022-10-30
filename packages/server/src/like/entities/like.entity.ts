import { Project } from '@/projects/entities/project.entity';
import { User } from '@/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LikeEnum } from '../types';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: false,
  })
  user: User;

  @Column({ type: 'enum', name: 'like', enum: LikeEnum })
  like: LikeEnum;

  @Column({ name: 'project_id' })
  projectId: number;

  @ManyToOne(() => Project, (project) => project.id, { nullable: false })
  project: Project;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
