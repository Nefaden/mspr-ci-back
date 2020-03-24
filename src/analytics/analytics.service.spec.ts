import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/product.entity';
import { Purchase } from '../purchases/purchase.entity';
import { Analytics } from './analytics.class';
import { AnalyticsService } from './analytics.service';
import { GetAnalyticsParams } from './params/analytics.param';

describe('Analytics Service', () => {
  let analyticsService: AnalyticsService;
  let purchaseRepository: Repository<Purchase>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Purchase),
          useClass: Repository
        },
        AnalyticsService
      ]
    }).compile();

    analyticsService = module.get<AnalyticsService>(AnalyticsService);
    purchaseRepository = module.get<Repository<Purchase>>(
      getRepositoryToken(Purchase)
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getAnalytics', () => {
    it('should return analytics for the specified year', async () => {
      const params: GetAnalyticsParams = { year: '2020' };
      const purchase1: Purchase = new Purchase();
      purchase1.quantity = 2;
      purchase1.product = new Product();
      purchase1.product.price = '2';
      const purchase2: Purchase = new Purchase();
      purchase2.quantity = 2;
      purchase2.product = new Product();
      purchase2.product.price = '2';
      const purchases: Purchase[] = [purchase1, purchase2];
      const result: Analytics = {
        year: params.year,
        turnover: 8
      };
      jest.spyOn(purchaseRepository, 'find').mockResolvedValue(purchases);

      expect(await analyticsService.getAnalytics(params)).toStrictEqual(result);
    });

    it('should return analytics for a year with no purchases', async () => {
      const params: GetAnalyticsParams = { year: '2019' };
      const purchases: Purchase[] = [];
      const result: Analytics = {
        year: params.year,
        turnover: 0
      };
      jest.spyOn(purchaseRepository, 'find').mockResolvedValue(purchases);

      expect(await analyticsService.getAnalytics(params)).toStrictEqual(result);
    });
  });
});
