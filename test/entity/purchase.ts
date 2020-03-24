import { getCustomer } from './customer';
import { getProduct } from './product';

export const getPurchase = () => {
  return {
    id: 'fc2d715c-dc99-4cad-a095-b1c572ddfe55',
    quantity: 5,
    date: '2020-03-05T17:58:12.000Z',
    customer: getCustomer(),
    product: getProduct()
  };
};
