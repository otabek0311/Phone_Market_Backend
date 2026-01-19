import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order_item.entity';
import { Cart } from '../cart/entities/cart.entity';
import { Adress } from '../adress/entities/adress.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, Cart, Adress]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
