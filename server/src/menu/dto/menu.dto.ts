import { ApiProperty } from '@nestjs/swagger';

export class MenuDto {
  @ApiProperty({
    example: '아메리카노',
    description: '메뉴명',
    required: true,
  })
  readonly title: string;

  @ApiProperty({
    example: '1',
    description: '카테고리 id',
    required: true,
  })
  readonly categoryId: number;

  @ApiProperty({
    example: '5000',
    description: '가격',
    required: true,
  })
  readonly price: number;

  @ApiProperty({
    example: '1',
    description: '메뉴 id',
    required: true,
  })
  readonly menuId: number;

  @ApiProperty({
    example: '1,2',
    description: '옵션 id',
    required: true,
  })
  readonly optionId: Array<number>;

  @ApiProperty({
    example: '1,4',
    description: '옵션 상세 id',
    required: true,
  })
  readonly optionDetailId: Array<number>;

  @ApiProperty({
    example: '작은 것,차가운 것',
    description: '옵션 title',
    required: true,
  })
  readonly optionTitle: Array<string>;

  @ApiProperty({
    example: '0,0',
    description: '옵션 추가요금',
    required: true,
  })
  readonly optionSurcharge: Array<number>;

  @ApiProperty({
    example: '10',
    description: '판매량',
    required: true,
  })
  readonly salesCnt: number;
}
