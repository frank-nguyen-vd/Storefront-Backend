import { Product } from '../../models/product.model';
import _ from 'lodash';

let productId: number;

describe('Model: Product', () => {
  it('should have method create()', () => {
    expect(Product.create).toBeDefined();
  });

  it('can create a new product with method create()', async () => {
    const res = await Product.create({
      name: 'Iphone 12',
      price: 1350.5,
      category: 'Smart Devices',
    });
    productId = res.id ?? 0;
    expect(_.omit(res, ['id'])).toEqual({
      name: 'Iphone 12',
      price: 1350.5,
      category: 'Smart Devices',
    });
  });

  it('should have method index()', () => {
    expect(Product.index).toBeDefined();
  });

  it('can list all products with method index()', async () => {
    const res = await Product.index();
    expect(res.length).toBeGreaterThan(0);
  });

  it('should have method show()', () => {
    expect(Product.show).toBeDefined();
  });

  it('can get a product given an id', async () => {
    const res = await Product.show(productId);
    expect(_.omit(res, ['id'])).toEqual({
      name: 'Iphone 12',
      price: 1350.5,
      category: 'Smart Devices',
    });
  });
});

afterAll(async () => {
  await Product.deleteById(productId);
});
