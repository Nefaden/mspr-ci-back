import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Customer } from '../customers/customer.entity';
import { Product } from '../products/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Purchase {
  @ApiProperty({
    example: '43f4f10e-181b-49bb-8b9a-52883eacb25f',
    description: 'Purchase\'s UUID.'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '2.4',
    description: 'Purchase\'s quantity.'
  })
  @Column('int')
  quantity: number;

  @ApiProperty({
    example: '2020-03-05 17:58:12',
    description: 'Purchase\'s date.'
  })
  @Column()
  date: Date;
  
  @ApiProperty({
    type: () => Customer,
    description: 'Purchase\'s customer.'
  })
  @ManyToOne(
    type => Customer,
    customer => customer.purchases,
    {
      eager: true
    }
  )
  customer: Customer;

  @ApiProperty({
    type: () => Product,
    description: 'Purchase\'s product.'
  })
  @ManyToOne(
    type => Product,
    product => product.purchases,
    {
      eager: true
    }
  )
  product: Product;
}
