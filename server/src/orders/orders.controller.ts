import {
  Body,
  Controller,
  Post,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
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
  async createOrders(@Body() ordersData: OrdersRequestDto) {
    const num = await this.ordersService.create(ordersData);
    if (!num) {
      throw new HttpException(
        `DATA INSERT ERROR`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } else {
      return num;
    }
  }
}
