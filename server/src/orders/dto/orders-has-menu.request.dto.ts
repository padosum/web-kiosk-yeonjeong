import { ApiProperty, PickType } from '@nestjs/swagger';
import { MenuDto } from 'src/menu/dto/menu.dto';

export class OrderHasMenuRequestDto extends PickType(MenuDto, ['menuId']) {
  @ApiProperty({
    example: '1,2',
    description: '옵션 상세 id',
    required: true,
  })
  public optionDetailId: string;

  @ApiProperty({
    example: '10',
    description: '수량',
    required: true,
  })
  public quantity: number;
}
