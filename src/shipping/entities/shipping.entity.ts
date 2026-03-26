import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
} from 'typeorm';
import { Order } from '../../order/entities/order.entity';

export enum ShippingStatus {
  PENDING = 'pending',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
}

@Entity('shippings')
export class Shipping {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Order, { onDelete: 'CASCADE' })
  order: Order;

  @Column({ nullable: true })
  carrier: string;

  @Column({ nullable: true })
  trackingNumber: string;

  @Column({
    type: 'enum',
    enum: ShippingStatus,
    default: ShippingStatus.PENDING,
  })
  status: ShippingStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
