import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt_auth.guard';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('Order')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @ApiOperation({ summary: 'Create order (checkout)' })
  @Post()
  create(@Req() req, @Body() dto: CreateOrderDto) {
    return this.service.createOrder(req.user, dto.addressId);
  }

  @ApiOperation({ summary: 'Get my orders' })
  @Get()
  getMyOrders(@Req() req) {
    return this.service.getMyOrders(req.user);
  }
}
