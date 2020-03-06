import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Purchase } from '../purchases/purchase.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Customer {
  @ApiProperty({
    example: '22fa8c19-8274-4ad5-a7f0-f6c1e5020199',
    description: 'Customer\'s UUID.'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Jean',
    description: 'Customer\'s first name.'
  })
  @Column()
  firstName: string;

  @ApiProperty({
    example: 'Pierre',
    description: 'Customer\'s last name.'
  })
  @Column()
  lastName: string;

  @ApiProperty({
    example: 'jean.pierre@ayamarket.com',
    description: 'Customer\'s email.'
  })
  @Column()
  email: string;

  @OneToMany(
    type => Purchase,
    purchase => purchase.customer
  )
  purchases: Purchase[];
}
