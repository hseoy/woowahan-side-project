import { User } from '@/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar', length: 45 })
  name: string;

  @Column({ type: 'varchar', length: 200 })
  description: string;

  @Column({ type: 'enum', enum: ['app', 'web', 'etc'] })
  platform: 'app' | 'web' | 'etc';

  @Column({ type: 'varchar', length: 2083, nullable: true })
  etcDeployLink?: string;

  @Column({ type: 'varchar', length: 2083, nullable: true })
  webDeployLink?: string;

  @Column({ type: 'varchar', length: 2083, nullable: true })
  androidDeployLink?: string;

  @Column({ type: 'varchar', length: 2083, nullable: true })
  iosDeployLink?: string;

  @Column({ type: 'varchar', length: 2083, nullable: true })
  githubLink?: string;

  @Column({ type: 'varchar', length: 2083, nullable: true })
  backgroundImg?: string;

  @Column({ type: 'boolean', default: false })
  isWsp: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
