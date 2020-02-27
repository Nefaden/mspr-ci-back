import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { Customer } from 'src/customers/customer.entity';
import { Product } from 'src/products/product.entity';

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
      eager: true,
    },
  )
  customer: Customer;

  @ManyToOne(
    type => Product,
    product => product.purchases,
    {
      eager: true,
    },
  )
  product: Product;
}
