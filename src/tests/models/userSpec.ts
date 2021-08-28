import {User, UserStore} from '../../models/user';

const store = new UserStore();

describe('User model', () => {
    it('should have index method', () => {
        expect(store.index).toBeDefined();
    })

    it('should have show method', () => {
        expect(store.show).toBeDefined();
    })

    it('should have create method', () => {
        expect(store.create).toBeDefined();
    })

    it('create method should add 1 user', async() =>{
        const result = await store.create({
            username: 'user1',
            firstname: 'John',
            lastname: 'Smith',
            password: 'password123'
        })
        expect(result).toEqual({
            id:1,
            username: 'user1',
            firstname: 'John',
            lastname: 'Smith'
        });
    })

    it('index method should return list', async() => {
        const result = await store.index();
        expect(result).toEqual([{
            id:1,
            username: 'user1',
            firstname: 'John',
            lastname: 'Smith'
        }])
    })

    it('show method should return single user', async () => {
        const result = await store.show('1');
        expect(result).toEqual({
            id:1,
            username: 'user1',
            firstname: 'John',
            lastname: 'Smith'
        })
    })
})