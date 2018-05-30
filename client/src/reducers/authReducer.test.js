import authReducer from './authReducer';
import { FETCH_USER } from '../actions/types';

test('should set default state', () => {
  const state = authReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual(null);
});

test('should set user to false if passed no user', () => {
  const action = { type: FETCH_USER, payload: '' };
  const state = authReducer(undefined, action);
  expect(state).toEqual(false);
});

test('should set user if passed a user', () => {
  const user = {
    _id: '1234567891020',
    googleId: '098765432101234',
    __v: 0,
  };
  const action = { type: FETCH_USER, payload: user };
  const state = authReducer(undefined, action);
  expect(state).toEqual(user);
});
