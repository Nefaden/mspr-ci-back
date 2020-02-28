import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from './purchase.entity';
import { Repository } from 'typeorm';
import { Customer } from '../customers/customer.entity';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>
  ) {}

  async findAll(customerId: string): Promise<Purchase[]> {
    if (customerId == undefined) {
      return this.purchaseRepository.find();
    } else {
      return this.customerRepository
        .findOneOrFail({ id: customerId })
        .then(customer => this.purchaseRepository.find({ customer: customer }))
        .catch(() => []);
    }
  }
}
