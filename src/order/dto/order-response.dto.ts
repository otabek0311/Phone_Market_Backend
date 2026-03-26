import { OrderStatus } from '../entities/order.entity';

export class OrderResponseDto {
  id: number;
  status: OrderStatus;
  totalPrice: number;
  createdAt: Date;
}
