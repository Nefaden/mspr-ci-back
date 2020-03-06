import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from '../purchases/purchase.entity';
import { AnalyticsController } from './analytics.controller';
import { Analytics } from './analytics.class';
import { AnalyticsService } from './analytics.service';
import { GetAnalyticsParams } from './params/analytics.param';

describe('Analytics Controller', () => {
  let analyticsController: AnalyticsController;
  let analyticsService: AnalyticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnalyticsController],
      providers: [
        {
          provide: getRepositoryToken(Purchase),
          useClass: Repository
        },
        AnalyticsService
      ]
    }).compile();

    analyticsController = module.get<AnalyticsController>(AnalyticsController);
    analyticsService = module.get<AnalyticsService>(AnalyticsService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getAnalytics', () => {
    it('should return analytics', async () => {
      const params: GetAnalyticsParams = { year: 2020 };
      const result: Analytics = {
        year: params.year,
        turnover: 123.45
      };
      jest.spyOn(analyticsService, 'getAnalytics').mockResolvedValue(result);

      expect(await analyticsController.getAnalytics(params)).toBe(result);
    });
  });
});
