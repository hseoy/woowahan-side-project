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

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: false,
  })
  user: User;

  @ManyToOne(() => Project, (project) => project.id, { nullable: false })
  project: Project;

  @Column({ type: 'varchar', length: 255 })
  message: string;

  @Column({ type: 'boolean', default: false })
  isAnonymous: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
