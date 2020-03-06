import { ApiProperty } from "@nestjs/swagger";

export class Analytics {
  @ApiProperty({
    example: '2020',
    description: 'Analytic\'s year.'
  })
  year: number;

  @ApiProperty({
    example: '129,56',
    description: 'Analytics\'s turnover.'
  })
  turnover: number;
}
