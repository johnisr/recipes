import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { fetchUser } from './actions';
import { FETCH_USER } from './types';

const mockStore = configureMockStore([thunk]);

describe('/auth', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('dispatches a FETCH_USER action after dispatching fetchUser', async () => {
    const response = {
      _id: '1234567891020',
      googleId: '098765432101234',
      __v: 0,
    };
    moxios.stubRequest('/auth/current_user', {
      status: 200,
      response,
    });

    const store = mockStore({ auth: null });

    await store.dispatch(fetchUser());
    expect(store.getActions()).toEqual([
      {
        type: FETCH_USER,
        payload: response,
      },
    ]);
  });
});
