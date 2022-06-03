import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty({
    type: String,
    description: 'Initial note title',
    required: true,
  })
  title: string;

  @ApiProperty({
    type: String,
    description: 'Initial note text',
    required: false,
  })
  text?: string;
}
