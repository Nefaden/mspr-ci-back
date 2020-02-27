import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

describe('Customers Controller', () => {
  let customersController: CustomersController;
  let customersService: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        {
          provide: getRepositoryToken(Customer),
          useClass: Repository,
        },
        CustomersService,
      ],
    }).compile();

    customersController = module.get<CustomersController>(CustomersController);
    customersService = module.get<CustomersService>(CustomersService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of customers', async () => {
      const result: Customer[] = [new Customer(), new Customer()];
      jest.spyOn(customersService, 'findAll').mockResolvedValue(result);

      expect(await customersController.findAll()).toBe(result);
    });
  });
});
