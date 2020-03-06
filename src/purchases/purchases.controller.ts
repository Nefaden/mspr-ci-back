import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Purchase } from './purchase.entity';
import { PurchasesService } from './purchases.service';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Get()
  @ApiOkResponse({
    description: 'Purchases has been loaded',
    type: [Purchase]
  })
  @ApiQuery({
    name: 'customerId',
    type: 'string',
    example: '43f4f10e-181b-49bb-8b9a-52883eacb25f'
  })
  @ApiTags('AYA Market')
  async findAll(@Query('customerId') customerId: string): Promise<Purchase[]> {
    return await this.purchasesService.findAll(customerId);
  }
}
