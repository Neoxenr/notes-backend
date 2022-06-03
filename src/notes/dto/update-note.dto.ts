import { ApiProperty } from '@nestjs/swagger';

export class UpdateNoteDto {
  @ApiProperty({
    type: String,
    description: 'New note title',
    required: true,
  })
  title: string;

  @ApiProperty({
    type: String,
    description: 'New note text',
    required: true,
  })
  text: string;
}
