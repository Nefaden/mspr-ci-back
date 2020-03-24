import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Purchase } from '../purchases/purchase.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Product {
  @ApiProperty({
    example: '8ab5da64-e75e-4381-97b0-d9e844e022e4',
    description: 'Product\'s UUID.'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Cake',
    description: 'Product\'s name.'
  })
  @Column()
  name: string;

  @ApiProperty({
    example: '12,56',
    description: 'Product\'s price.'
  })
  @Column({ type: 'numeric', precision: 6, scale: 3 })
  price: string;  

  @OneToMany(
    type => Purchase,
    purchase => purchase.product,
  )
  purchases: Purchase[];
}
