import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Purchase } from '../purchases/purchase.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @OneToMany(
    type => Purchase,
    purchase => purchase.customer
  )
  purchases: Purchase[];
}
