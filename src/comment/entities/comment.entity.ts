import { Profile } from "src/profile/entities/profile.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @ManyToOne(() => Profile, { onDelete: 'CASCADE' })
    user: Profile;

    @ManyToOne(() => Product, { onDelete: 'CASCADE' })
    product: Product;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
