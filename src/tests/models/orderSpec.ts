import {Order, OrderStore} from '../../models/order';
//import {User, UserStore} from '../../models/user';
//import {Product, ProductStore} from '../../models/product';

const store = new OrderStore();
//const userStore = new UserStore();
//const productStore = new ProductStore();

describe('Order model', () => {
    it('should have index method', () => {
        expect(store.index).toBeDefined();
    })

    it('should have show method', () => {
        expect(store.show).toBeDefined();
    })

    it('should have create method', () => {
        expect(store.create).toBeDefined();
    })

    it('create method should add 1 order', async() =>{
        const result = await store.create({
            status: 'active',
            user_id: '1'
        })
        expect(result).toEqual({
            id:1,
            status: 'active',
            user_id: '1'
        });
    })

    it('index method should return list', async() => {
        const result = await store.index();
        expect(result).toEqual([{
            id:1,
            status: 'active',
            user_id: '1'
        }])
    })

    it('show method should return single order', async () => {
        const result = await store.show('1');
        expect(result).toEqual({
            id:1,
            status: 'active',
            user_id: '1'
        })
    })

    it('addProduct method should add 1 order_product', async () => {
        const result = await store.addProduct(1, '1', '1');
        expect(result).toEqual({
            id:1,
            quantity:1, 
            product_id: '1', 
            order_id: '1'
        })
    })
})