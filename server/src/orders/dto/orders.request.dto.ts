import { ApiProperty } from '@nestjs/swagger';
import { OrderHasMenuRequestDto } from './orders-has-menu.request.dto';

export class OrdersRequestDto {
  @ApiProperty({
    example: '1',
    description: 'paymentId',
    required: true,
  })
  public paymentId: number;

  @ApiProperty({
    example: '10000',
    description: 'paymentAmount',
    required: true,
  })
  public paymentAmount: number;

  @ApiProperty({
    example: '10000',
    description: 'totalAmount',
    required: true,
  })
  public totalAmount: number;

  @ApiProperty({
    type: OrderHasMenuRequestDto,
    example: {
      menuId: 2,
      optionDetailId: '1,4',
    },
    description: 'menu',
    required: true,
  })
  public menu: OrderHasMenuRequestDto[];
}
