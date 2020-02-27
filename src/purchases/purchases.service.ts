import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from './purchase.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
  ) {}

  async findAll(): Promise<Purchase[]> {
    return this.purchaseRepository.find();
  }
}
