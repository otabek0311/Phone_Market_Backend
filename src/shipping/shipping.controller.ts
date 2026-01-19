import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ShippingService } from './shipping.service';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { JwtAuthGuard } from '../auth/jwt_auth.guard';
import { AdminGuard } from '../category/common/guards/admin.guard';

@ApiTags('Shipping')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('shipping')
export class ShippingController {
  constructor(private readonly service: ShippingService) {}

  @ApiOperation({ summary: 'Get shipping by order (user)' })
  @Get(':orderId')
  getByOrder(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.service.getByOrder(orderId);
  }

  @ApiOperation({ summary: 'Update shipping (admin)' })
  @UseGuards(AdminGuard)
  @Patch(':orderId')
  update(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() dto: UpdateShippingDto,
  ) {
    return this.service.update(orderId, dto);
  }
}
