import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Controller('users')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post(':userId/notes')
  async create(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() createNoteDto: CreateNoteDto,
  ): Promise<Note> {
    return this.notesService.create(userId, createNoteDto);
  }

  @Get(':userId/notes')
  async findAll(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<Note[]> {
    return this.notesService.findAll(userId);
  }

  @Get(':userId/notes/:noteId')
  async findOne(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('noteId', ParseUUIDPipe) noteId: string,
  ): Promise<Note> {
    return this.notesService.findOne(userId, noteId);
  }

  @Patch(':userId/notes/:noteId')
  async update(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('noteId', ParseUUIDPipe) noteId: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ): Promise<Note> {
    return this.notesService.update(userId, noteId, updateNoteDto);
  }

  @Delete(':userId/notes/:noteId')
  async remove(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('noteId', ParseUUIDPipe) noteId: string,
  ): Promise<boolean> {
    return this.notesService.remove(userId, noteId);
  }
}
