import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipping } from './entities/shipping.entity';
import { Order } from '../order/entities/order.entity';

@Injectable()
export class ShippingService {
  constructor(
    @InjectRepository(Shipping)
    private readonly shippingRepository: Repository<Shipping>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createForOrder(orderId: number) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const shipping = this.shippingRepository.create({
      order,
    });

    return this.shippingRepository.save(shipping);
  }

  async update(orderId: number, dto: Partial<Shipping>) {
    const shipping = await this.shippingRepository.findOne({
      where: { order: { id: orderId } },
      relations: ['order'],
    });

    if (!shipping) {
      throw new NotFoundException('Shipping not found');
    }

    Object.assign(shipping, dto);
    return this.shippingRepository.save(shipping);
  }

  async getByOrder(orderId: number) {
    const shipping = await this.shippingRepository.findOne({
      where: { order: { id: orderId } },
    });

    if (!shipping) {
      throw new NotFoundException('Shipping not found');
    }

    return shipping;
  }
}
