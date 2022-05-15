import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private readonly notesRepository: Repository<Note>,
  ) {}

  async create(userId: string, createNoteDto: CreateNoteDto): Promise<Note> {
    return this.notesRepository.save({ ...createNoteDto, userId });
  }

  async findAll(userId: string): Promise<Note[]> {
    return this.notesRepository.find({
      where: { userId },
    });
  }

  async findOne(userId: string, noteId: string): Promise<Note> {
    return this.notesRepository.findOneOrFail(noteId, {
      where: { userId },
    });
  }

  async update(
    userId: string,
    noteId: string,
    updateNoteDto: UpdateNoteDto,
  ): Promise<Note> {
    await this.notesRepository.update(noteId, { ...updateNoteDto, userId });

    return this.findOne(userId, noteId);
  }

  async remove(userId: string, noteId: string): Promise<boolean> {
    await this.findOne(userId, noteId);

    await this.notesRepository.delete(noteId);

    return true;
  }
}
