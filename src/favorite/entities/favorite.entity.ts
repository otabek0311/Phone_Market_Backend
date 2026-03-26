import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Profile } from '../../profile/entities/profile.entity';
import { Product } from '../../product/entities/product.entity';

@Entity('favorites')
@Unique(['user', 'product'])
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profile, { onDelete: 'CASCADE' })
  user: Profile;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  product: Product;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
