import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../customers/customer.entity';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { Purchase } from './purchase.entity';

describe('Customers Controller', () => {
  let purchasesController: PurchasesController;
  let purchasesService: PurchasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchasesController],
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

    purchasesController = module.get<PurchasesController>(PurchasesController);
    purchasesService = module.get<PurchasesService>(PurchasesService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of purchases', async () => {
      const customerId: string = undefined;
      const result: Purchase[] = [new Purchase(), new Purchase()];
      jest.spyOn(purchasesService, 'findAll').mockResolvedValue(result);

      expect(await purchasesController.findAll(customerId)).toBe(result);
    });

    it("should return customers' purchases", async () => {
      const customerId = 'd73426d4-e278-4d1a-b308-07997429c8c7';
      const result: Purchase[] = [new Purchase(), new Purchase()];
      jest.spyOn(purchasesService, 'findAll').mockResolvedValue(result);

      expect(await purchasesController.findAll(customerId)).toBe(result);
    });
  });

});
