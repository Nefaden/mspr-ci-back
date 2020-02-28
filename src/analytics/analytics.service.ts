import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { Purchase } from '../purchases/purchase.entity';
import { Analytics } from './analytics.interface';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>
  ) {}

  async getAnalytics(year: number): Promise<Analytics> {
    return {
      year: year,
      turnover: await this.getTurnover(year)
    };
  }

  private async getTurnover(year: number): Promise<number> {
    let total = 0;

    await this.getPurchasesByYear(year).then(purchases =>
      purchases.forEach(
        purchase => (total += purchase.quantity * purchase.product.price)
      )
    );
    return +total.toFixed(3);
  }

  private async getPurchasesByYear(year: number) {
    return this.purchaseRepository
      .find({
        date: Raw(alias => `extract(year from ${alias}) = ${year}`)
      })
      .catch(() => {
        throw new BadRequestException();
      });
  }
}
