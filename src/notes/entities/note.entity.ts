import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'note' })
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  text: string;

  @ManyToOne(() => User, (user) => user.notes)
  user: User;

  @Column('varchar')
  userId: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
