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
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post(':userId/notes')
  async create(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() createNoteDto: CreateNoteDto,
  ): Promise<Note> {
    return this.notesService.create(userId, createNoteDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':userId/notes')
  async findAll(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Query('trash', ParseBoolPipe) isTrash: boolean,
  ): Promise<Note[]> {
    return this.notesService.findAll(userId, isTrash);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':userId/notes/:noteId')
  async findOne(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('noteId', ParseUUIDPipe) noteId: string,
  ): Promise<Note> {
    return this.notesService.findOne(userId, noteId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':userId/notes/:noteId')
  async update(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('noteId', ParseUUIDPipe) noteId: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ): Promise<boolean> {
    return this.notesService.update(userId, noteId, updateNoteDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':userId/notes/:noteId/restore')
  async restore(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('noteId', ParseUUIDPipe) noteId: string,
  ): Promise<boolean> {
    return this.notesService.restore(userId, noteId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':userId/notes/:noteId')
  async remove(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('noteId', ParseUUIDPipe) noteId: string,
    @Query('softDelete', ParseBoolPipe) isSoftDelete: boolean,
  ): Promise<boolean> {
    return this.notesService.remove(userId, noteId, isSoftDelete);
  }
}
