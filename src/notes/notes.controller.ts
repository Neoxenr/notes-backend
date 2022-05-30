import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  ParseBoolPipe,
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
    @Query('trash', ParseBoolPipe) isTrash: boolean,
  ): Promise<Note[]> {
    return this.notesService.findAll(userId, isTrash);
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
  ): Promise<boolean> {
    return this.notesService.update(userId, noteId, updateNoteDto);
  }

  @Patch(':userId/notes/:noteId/restore')
  async restore(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('noteId', ParseUUIDPipe) noteId: string,
  ): Promise<boolean> {
    return this.notesService.restore(userId, noteId);
  }

  @Delete(':userId/notes/:noteId')
  async remove(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('noteId', ParseUUIDPipe) noteId: string,
    @Query('softDelete', ParseBoolPipe) isSoftDelete: boolean,
  ): Promise<boolean> {
    return this.notesService.remove(userId, noteId, isSoftDelete);
  }
}
