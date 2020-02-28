import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Customer } from '../customers/customer.entity';
import { Product } from '../products/product.entity';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  quantity: number;

  @Column()
  date: Date;

  @ManyToOne(
    type => Customer,
    customer => customer.purchases,
    {
      eager: true
    }
  )
  customer: Customer;

  @ManyToOne(
    type => Product,
    product => product.purchases,
    {
      eager: true
    }
  )
  product: Product;
}
