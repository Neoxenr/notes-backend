import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'note' })
export class Note {
  @ApiProperty({
    type: String,
    description: 'Note id',
    required: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: String,
    description: 'Note title',
    required: true,
  })
  @Column('varchar')
  title: string;

  @ApiProperty({
    type: String,
    description: 'Note text',
    required: false,
  })
  @Column('varchar', { nullable: true })
  text?: string;

  @ManyToOne(() => User, (user) => user.notes)
  user: User;

  @ApiProperty({
    type: String,
    description: 'Used id',
    required: true,
  })
  @Column('varchar')
  userId: string;

  @ApiProperty({
    type: String,
    description: 'Date of note creation',
    required: false,
  })
  @CreateDateColumn()
  createdAt: string;

  @ApiProperty({
    type: String,
    description: 'Date of note update',
    required: false,
  })
  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}
