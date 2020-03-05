import { Controller, Get, Param } from '@nestjs/common';
import { Analytics } from './analytics.interface';
import { AnalyticsService } from './analytics.service';
import { GetAnalyticsParams } from './params/analytics.param';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get(':year')
  async getAnalytics(@Param() params: GetAnalyticsParams): Promise<Analytics> {
    return await this.analyticsService.getAnalytics(params);
  }
}
