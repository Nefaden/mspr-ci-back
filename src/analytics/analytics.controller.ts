import { Controller, Get, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { Analytics } from './analytics.interface';

@Controller('analytics')
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) {}

    @Get(':year')
    async getAnalytics(@Param('year') year): Promise<Analytics> {
      return await this.analyticsService.getAnalytics(year);
    }
}
