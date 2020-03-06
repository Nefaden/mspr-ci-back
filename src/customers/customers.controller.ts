import { Controller, Get } from '@nestjs/common';
import { Customer } from './customer.entity';
import { CustomersService } from './customers.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  @ApiOkResponse({
    description: 'Customers has been loaded',
    type: [Customer]
  })
  @ApiTags('AYA Market')
  async findAll(): Promise<Customer[]> {
    return await this.customersService.findAll();
  }
}
