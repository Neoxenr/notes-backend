import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { Note } from 'src/notes/entities/note.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @ApiProperty({
    type: String,
    description: 'User id',
    required: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: String,
    description: 'User email',
    required: true,
  })
  @IsEmail()
  @Column('varchar')
  email: string;

  @ApiProperty({
    type: String,
    description: 'User password',
    required: true,
  })
  @Column('varchar')
  password: string;

  @OneToMany(() => Note, (note) => note.user, { nullable: true })
  notes?: Note[];

  @ApiProperty({
    type: String,
    description: 'User creating date',
    required: false,
  })
  @CreateDateColumn()
  createdAt: string;

  @ApiProperty({
    type: String,
    description: 'User updating date',
    required: false,
  })
  @UpdateDateColumn()
  updatedAt: string;
}
