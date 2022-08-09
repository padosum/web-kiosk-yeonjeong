import { ApiProperty } from '@nestjs/swagger';
import { MenuDto } from './menu.dto';

export class ReadMenuDto {
  @ApiProperty({
    example: 1,
    description: '메뉴 id',
  })
  readonly id: number;

  @ApiProperty({
    example: '아메리카노',
    description: '메뉴명',
  })
  readonly title: string;

  @ApiProperty({
    type: [MenuDto],
  })
  readonly menu: MenuDto[];
}
