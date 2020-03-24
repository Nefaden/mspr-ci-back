import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { Purchase } from '../purchases/purchase.entity';
import { Analytics } from './analytics.class';
import { GetAnalyticsParams } from './params/analytics.param';
import { validate, validateOrReject } from 'class-validator';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>
  ) {}

  async getAnalytics(params: GetAnalyticsParams): Promise<Analytics> {
    return await validateOrReject(params)
      .then(() => this.getTurnover(params.year))
      .then(turnover => {
        return {
          year: params.year.toString(),
          turnover: turnover
        };
      }).catch(() => {
        throw new BadRequestException()
      });
  }

  private async getTurnover(year: number): Promise<number> {
    let total = 0;

    await this.getPurchasesByYear(year).then(purchases =>
      purchases.forEach(
        purchase => (total += purchase.quantity * +purchase.product.price)
      )
    );
    return +total.toFixed(3);
  }

  private async getPurchasesByYear(year: number): Promise<Purchase[]> {
    return this.purchaseRepository.find({
      date: Raw(alias => `extract(year from ${alias}) = ${year}`)
    });
  }
}
