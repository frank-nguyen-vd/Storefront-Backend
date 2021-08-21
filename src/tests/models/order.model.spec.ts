import { Order } from '../../models/order.model';
import { Product } from '../../models/product.model';
import { User } from '../../models/user.model';
import _ from 'lodash';

let productId: number;
let userId: number;
let orderId: number;

describe('Model: Order', () => {
  it('should have method create()', () => {
    expect(Order.create).toBeDefined();
  });

  it('can create a new order with method create()', async () => {
    userId =
      (
        await User.create({
          first_name: 'Arcadia',
          last_name: 'Oak',
          username: 'redfox',
          password: 'abc123',
        })
      ).id ?? 0;

    productId =
      (
        await Product.create({
          name: 'Iphone 12',
          price: 1350.5,
          category: 'Smart Devices',
        })
      ).id ?? 0;

    const res = await Order.create({
      product_id: productId,
      user_id: userId,
      qty: 1,
    });
    orderId = res.id ?? 0;

    expect(_.omit(res, ['id', 'is_completed'])).toEqual({
      product_id: productId,
      user_id: userId,
      qty: 1,
    });
  });

  it('should have method index()', () => {
    expect(Order.index).toBeDefined();
  });

  it('can list all orders with method index()', async () => {
    const res = await Order.index();
    expect(res.length).toBeGreaterThan(0);
  });

  it('should have method show()', () => {
    expect(Order.show).toBeDefined();
  });

  it('can get a order given an id', async () => {
    const res = await Order.show(orderId);
    expect(_.omit(res, ['id', 'is_completed'])).toEqual({
      product_id: productId,
      user_id: userId,
      qty: 1,
    });
  });
});

afterAll(async () => {
  await Order.deleteById(orderId);
});
