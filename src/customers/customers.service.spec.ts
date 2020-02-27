import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CustomersService } from './customers.service';

describe('Customers Service', () => {
  let customersService: CustomersService;
  let customerRepository: Repository<Customer>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Customer),
          useClass: Repository,
        },
        CustomersService,
      ],
    }).compile();

    customersService = module.get<CustomersService>(CustomersService);
    customerRepository = module.get<Repository<Customer>>(getRepositoryToken(Customer));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of customers', async () => {
      const result: Customer[] = [new Customer(), new Customer()];
      jest.spyOn(customerRepository, 'find').mockResolvedValue(result);

      expect(await customersService.findAll()).toBe(result);
    });
  });
});
