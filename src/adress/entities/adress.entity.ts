import { Profile } from 'src/profile/entities/profile.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('adress')
export class Adress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  phone: string;

  @ManyToOne(() => Profile, { onDelete: 'CASCADE' })
  user: Profile;
}
