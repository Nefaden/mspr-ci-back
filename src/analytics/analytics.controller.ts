import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags
} from '@nestjs/swagger';
import { Analytics } from './analytics.class';
import { AnalyticsService } from './analytics.service';
import { GetAnalyticsParams } from './params/analytics.param';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get(':year')
  @ApiOkResponse({
    description: 'Analytics has been loaded',
    type: Analytics
  })
  @ApiBadRequestResponse({
    description: 'Year is not a number'
  })
  @ApiParam({ name: 'year', type: 'number', example: '2020' })
  @ApiTags('AYA Market')
  async getAnalytics(@Param() params: GetAnalyticsParams): Promise<Analytics> {
    return await this.analyticsService.getAnalytics(params);
  }
}
