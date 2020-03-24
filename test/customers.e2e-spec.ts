import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { AppModule } from '../src/app.module';
import { Customer } from '../src/customers/customer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getCustomer } from './entity/customer';

describe('Customers (e2e)', () => {
  let app: INestApplication;
  let customersRepository: Repository<Customer>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = module.createNestApplication();
    await app.init();

    customersRepository = module.get(getRepositoryToken(Customer));
    await customersRepository.save(getCustomer());
  });

  it('/customers (GET)', () => {
    return request(app.getHttpServer())
      .get('/customers')
      .expect(200)
      .expect([getCustomer()]);
  });

  afterAll(async () => {
    customersRepository.delete(getCustomer());
    app.close();
  });
});
