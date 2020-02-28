import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from './purchase.entity';
import { Customer } from '../customers/customer.entity';
import { PurchasesService } from './purchases.service';

describe('Customers Service', () => {
  let purchasesService: PurchasesService;
  let customerRepository: Repository<Customer>;
  let purchaseRepository: Repository<Purchase>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Customer),
          useClass: Repository
        },
        {
          provide: getRepositoryToken(Purchase),
          useClass: Repository
        },
        PurchasesService
      ]
    }).compile();

    purchasesService = module.get<PurchasesService>(PurchasesService);
    customerRepository = module.get<Repository<Customer>>(
      getRepositoryToken(Customer)
    );
    purchaseRepository = module.get<Repository<Purchase>>(
      getRepositoryToken(Purchase)
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of purchases', async () => {
      const customerId: string = undefined;
      const result: Purchase[] = [new Purchase(), new Purchase()];
      jest.spyOn(purchaseRepository, 'find').mockResolvedValue(result);

      expect(await purchasesService.findAll(customerId)).toBe(result);
    });
  });

  describe('findAll', () => {
    it("should return customers' purchases", async () => {
      const customerId = 'd73426d4-e278-4d1a-b308-07997429c8c7';
      const customer: Customer = new Customer();
      const result: Purchase[] = [new Purchase(), new Purchase()];
      jest.spyOn(customerRepository, 'findOneOrFail').mockResolvedValue(customer);
      jest.spyOn(purchaseRepository, 'find').mockResolvedValue(result);

      expect(await purchasesService.findAll(customerId)).toBe(result);
    });
  });
});
