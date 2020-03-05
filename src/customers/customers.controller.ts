import { Controller, Get } from '@nestjs/common';
import { Customer } from './customer.entity';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  async findAll(): Promise<Customer[]> {
    return await this.customersService.findAll();
  }
}
