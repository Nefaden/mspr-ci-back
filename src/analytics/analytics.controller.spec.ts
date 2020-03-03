import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from '../purchases/purchase.entity';
import { AnalyticsController } from './analytics.controller';
import { Analytics } from './analytics.interface';
import { AnalyticsService } from './analytics.service';
import { BadRequestException } from '@nestjs/common';

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
      const year = 2020;
      const result: Analytics = {
        year: year,
        turnover: 123.45
      };
      jest.spyOn(analyticsService, 'getAnalytics').mockResolvedValue(result);

      expect(await analyticsController.getAnalytics(year)).toBe(result);
    });

    it('should throw a BadRequestException', async done => {
      const year = 'test';
      jest.spyOn(analyticsService, 'getAnalytics').mockImplementation(() => {
        throw new BadRequestException();
      });

      await analyticsController
        .getAnalytics(year)
        .then(() =>
          done.fail(
            'Client controller should return BadRequestException error of 400 but did not'
          )
        )
        .catch(error => {
          expect(error.status).toBe(400);
          expect(error.message.error).toBe('Bad Request');
          done();
        });
    });
  });
});
