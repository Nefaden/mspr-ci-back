import { Injectable } from '@nestjs/common';
import { Customer } from './customer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find({
      order: {
        lastName: 'ASC',
        firstName: 'ASC',
      },
    });
  }
}
