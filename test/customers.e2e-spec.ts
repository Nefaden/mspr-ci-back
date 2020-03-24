import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { AppModule } from '../src/app.module';
import { Customer } from '../src/customers/customer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Customers (e2e)', () => {
  let app: INestApplication;
  let customersRepository: Repository<Customer>;
  const customer = {
    id: '1f4b3f76-c229-4a09-9c30-d95785b29007',
    email: 'test@test.fr',
    firstName: 'Test',
    lastName: 'TEST'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = module.createNestApplication();
    await app.init();

    customersRepository = module.get(getRepositoryToken(Customer));
    customersRepository.save(customer);
  });

  it('/customers (GET)', () => {
    return request(app.getHttpServer())
      .get('/customers')
      .expect(200)
      .expect([customer]);
  });

  afterEach(() => {
    customersRepository.delete(customer);
    app.close();
  });
});
