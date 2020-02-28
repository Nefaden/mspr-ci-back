import { Controller, Get, Query } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { Purchase } from './purchase.entity';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Get()
  async findAll(@Query('customerId') customerId: string): Promise<Purchase[]> {
    return await this.purchasesService.findAll(customerId);
  }
}
