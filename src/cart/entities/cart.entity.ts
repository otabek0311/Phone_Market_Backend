import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { Profile } from '../../profile/entities/profile.entity';
import { Product } from '../../product/entities/product.entity';

@Entity('cart')
export class Cart {

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Profile, { onDelete: 'CASCADE' })
  user!: Profile;

  @ManyToOne(() => Product, { eager: true, onDelete: 'CASCADE' })
  product!: Product;

  @Column({ type: 'int' })
  quantity!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
