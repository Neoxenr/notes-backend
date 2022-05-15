import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_URL } from './config';
import { User } from './users/entities/user.entity';
import { Note } from './notes/entities/note.entity';

@Module({
  imports: [
    UsersModule,
    NotesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: DB_URL,
      entities: [User, Note],
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
