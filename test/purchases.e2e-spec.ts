import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { AppModule } from '../src/app.module';
import { Customer } from '../src/customers/customer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Purchase } from '../src/purchases/purchase.entity';
import { Product } from '../src/products/product.entity';
import { getCustomer } from './entity/customer';
import { getProduct } from './entity/product';
import { getPurchase } from './entity/purchase';

describe('Purchases (e2e)', () => {
  let app: INestApplication;
  let customersRepository: Repository<Customer>;
  let productsRepository: Repository<Product>;
  let purchasesRepository: Repository<Purchase>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = module.createNestApplication();
    await app.init();

    customersRepository = module.get(getRepositoryToken(Customer));
    productsRepository = module.get(getRepositoryToken(Product));
    purchasesRepository = module.get(getRepositoryToken(Purchase));

    await customersRepository.save(getCustomer());
    await productsRepository.save(getProduct());
    await purchasesRepository.save(getPurchase());
  });

  it('/purchases (GET)', () => {
    return request(app.getHttpServer())
      .get('/purchases')
      .expect(200)
      .expect([getPurchase()]);
  });

  afterEach(() => {
    purchasesRepository.save(getPurchase());
    productsRepository.save(getProduct());
    customersRepository.delete(getCustomer());
    app.close();
  });
});
