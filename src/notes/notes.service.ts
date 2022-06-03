import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, IsNull, Not, Repository, UpdateResult } from 'typeorm';
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

  async findAll(userId: string, isTrash: boolean): Promise<Note[]> {
    return this.notesRepository.find({
      where: { userId, deletedAt: isTrash ? Not(IsNull()) : IsNull() },
      order: {
        updatedAt: 'DESC',
      },
      withDeleted: isTrash,
    });
  }

  async findOne(userId: string, noteId: string): Promise<Note> {
    return this.notesRepository.findOneOrFail(noteId, {
      where: { userId },
      withDeleted: true,
    });
  }

  async update(
    userId: string,
    noteId: string,
    updateNoteDto: UpdateNoteDto,
  ): Promise<boolean> {
    const updateResponse: UpdateResult = await this.notesRepository.update(
      { id: noteId, userId },
      { ...updateNoteDto },
    );

    if (!updateResponse.affected) {
      throw new NotFoundException(noteId);
    }

    return true;
  }

  async restore(userId: string, noteId: string): Promise<boolean> {
    const restoreResponse: UpdateResult = await this.notesRepository.restore({
      id: noteId,
      userId,
    });

    if (!restoreResponse.affected) {
      throw new NotFoundException(noteId);
    }

    return true;
  }

  async remove(
    userId: string,
    noteId: string,
    isSoftDelete: boolean,
  ): Promise<boolean> {
    let deletedResponse: UpdateResult | DeleteResult;

    if (isSoftDelete) {
      deletedResponse = await this.notesRepository.softDelete({
        userId,
        id: noteId,
      });
    } else {
      deletedResponse = await this.notesRepository.delete({
        userId,
        id: noteId,
      });
    }

    if (!deletedResponse.affected) {
      throw new NotFoundException();
    }

    return true;
  }
}
