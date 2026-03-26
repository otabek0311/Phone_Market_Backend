import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { Profile } from '../../profile/entities/profile.entity';
import { Adress } from '../../adress/entities/adress.entity';
import { OrderItem } from './order_item.entity';

export enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  CANCELLED = 'cancelled',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profile, { onDelete: 'SET NULL' })
  user: Profile;

  @ManyToOne(() => Adress, { onDelete: 'SET NULL' })
  address: Adress;

  @OneToMany(() => OrderItem, (item) => item.order, {
    cascade: true,
  })
  items: OrderItem[];

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column('decimal')
  totalPrice: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

