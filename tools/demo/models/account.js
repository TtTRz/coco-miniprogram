import { effects } from '../libs/vendors/redux-saga.min'

const { put } = effects;

const AccountModel = {
  namespace: 'account',
  state: {
    name: 'hello',
    age: 18,
  },
  effects: {
    *addAge({ payload }) {
      yield put({
        type: 'account/changeState',
        payload: {
          ...payload
        }
      })
    }
  },
  reducers: {
    changeState: (state, payload) => {
      return {
        ...state,
        ...payload,
      }
    },
  }
}

export default AccountModel;
