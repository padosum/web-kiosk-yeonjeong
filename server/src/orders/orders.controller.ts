import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrdersRequestDto } from './dto/orders.request.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({
    summary: '주문 내역 추가 API',
    description: '상품 주문 내역을 추가합니다.',
  })
  @ApiResponse({
    type: OrdersRequestDto,
    description: 'success',
    status: 200,
  })
  @Post()
  createOrders(@Body() ordersData: OrdersRequestDto): Promise<number> {
    return this.ordersService.create(ordersData);
  }
}
