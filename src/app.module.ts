import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customers/customer.entity';
import { CustomersModule } from './customers/customers.module';
import { Product } from './products/product.entity';
import { Purchase } from './purchases/purchase.entity';
import { PurchasesModule } from './purchases/purchases.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      schema: process.env.DATABASE_SCHEMA,
      entities: [Customer, Product, Purchase],
      synchronize: true,
    }),
    AnalyticsModule,
    CustomersModule,
    ProductsModule,
    PurchasesModule,
  ],
})
export class AppModule {}
