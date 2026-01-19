import { Profile } from "src/profile/entities/profile.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('cart')
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @ManyToOne(() => Profile, { onDelete: 'CASCADE' })
    user: Profile;

    @ManyToOne(() => Product, { onDelete: 'CASCADE' })
    product: Product;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
