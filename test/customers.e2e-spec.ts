import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { AppModule } from '../src/app.module';
import { Customer } from '../src/customers/customer.entity';

describe('Customers (e2e)', () => {
  let app: INestApplication;
  const customersRepository: Repository<Customer> = new Repository<Customer>();
  const customer: Customer = {
    id: '1f4b3f76-c229-4a09-9c30-d95785b29007',
    email: 'test@test.fr',
    firstName: 'Test',
    lastName: 'Test',
    purchases: []
  };

  beforeAll(() => {
    customersRepository.save(customer);
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/customers (GET)', () => {
    return request(app.getHttpServer())
      .get('/customers')
      .expect(200)
      .expect([customer]);
  });

  afterAll(() => {
    customersRepository.delete(customer);
  });
});
