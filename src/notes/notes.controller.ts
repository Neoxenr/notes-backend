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
  Request,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Request() req,
    @Body() createNoteDto: CreateNoteDto,
  ): Promise<Note> {
    return this.notesService.create(req.user.id, createNoteDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(
    @Request() req,
    @Query('trash', ParseBoolPipe) isTrash: boolean,
  ): Promise<Note[]> {
    return this.notesService.findAll(req.user.id, isTrash);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':noteId')
  async findOne(
    @Request() req,
    @Param('noteId', ParseUUIDPipe) noteId: string,
  ): Promise<Note> {
    return this.notesService.findOne(req.user.id, noteId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':noteId')
  async update(
    @Request() req,
    @Param('noteId', ParseUUIDPipe) noteId: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ): Promise<boolean> {
    return this.notesService.update(req.user.id, noteId, updateNoteDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':noteId/restore')
  async restore(
    @Request() req,
    @Param('noteId', ParseUUIDPipe) noteId: string,
  ): Promise<boolean> {
    return this.notesService.restore(req.user.id, noteId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':noteId')
  async remove(
    @Request() req,
    @Param('noteId', ParseUUIDPipe) noteId: string,
    @Query('softDelete', ParseBoolPipe) isSoftDelete: boolean,
  ): Promise<boolean> {
    return this.notesService.remove(req.user.id, noteId, isSoftDelete);
  }
}
