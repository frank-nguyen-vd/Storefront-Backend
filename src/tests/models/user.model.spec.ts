import { User } from '../../models/user.model';
import _ from 'lodash';

let userId: number;

describe('Model: User', () => {
  it('should have method create()', () => {
    expect(User.create).toBeDefined();
  });

  it('can create a new user with method create()', async () => {
    const res = await User.create({
      first_name: 'Arcadia',
      last_name: 'Oak',
      username: 'redfox',
      password: 'abc123',
    });
    userId = res.id ?? 0;
    expect(_.omit(res, ['password', 'id'])).toEqual({
      first_name: 'Arcadia',
      last_name: 'Oak',
      username: 'redfox',
    });
  });

  it('should have method index()', () => {
    expect(User.index).toBeDefined();
  });

  it('can list all users with method index()', async () => {
    const res = await User.index();
    expect(res.length).toBeGreaterThan(0);
  });

  it('should have method show()', () => {
    expect(User.show).toBeDefined();
  });

  it('can get an user given an id', async () => {
    const res = await User.show(userId);
    expect(_.omit(res, ['password', 'id'])).toEqual({
      first_name: 'Arcadia',
      last_name: 'Oak',
      username: 'redfox',
    });
  });
});

afterAll(async () => {
  await User.deleteById(userId);
});
