import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Purchase } from 'src/purchases/purchase.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'numeric', precision: 6, scale: 3 })
  price: number;

  @OneToMany(
    type => Purchase,
    purchase => purchase.product,
  )
  purchases: Purchase[];
}
