import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { OrderItem } from './entities/order_item.entity';
import { Cart } from '../cart/entities/cart.entity';
import { Adress } from '../adress/entities/adress.entity';
import { Profile } from '../profile/entities/profile.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,

    @InjectRepository(Adress)
    private readonly adressRepository: Repository<Adress>,
  ) {}

  async createOrder(user: Profile, addressId: number) {
    const cartItems = await this.cartRepository.find({
      where: { user: { id: user.id } },
      relations: ['product'],
    });

    if (cartItems.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    const address = await this.adressRepository.findOne({
      where: { id: addressId, user: { id: user.id } },
    });

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    let total = 0;

    const orderItems = cartItems.map((item) => {
      total += Number(item.product.price) * item.quantity;

      return this.orderItemRepository.create({
        product: item.product,
        quantity: item.quantity,
        price: item.product.price,
      });
    });

    const order = this.orderRepository.create({
      user,
      address,
      items: orderItems,
      totalPrice: total,
      status: OrderStatus.PENDING,
    });

    const savedOrder = await this.orderRepository.save(order);

    await this.cartRepository.remove(cartItems);

    return savedOrder;
  }

  async getMyOrders(user: Profile) {
    return this.orderRepository.find({
      where: { user: { id: user.id } },
      relations: ['items', 'items.product'],
      order: { createdAt: 'DESC' },
    });
  }
}
