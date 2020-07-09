import { effects } from '../coco-miniprogram'

const { call, put } = effects;

const getAccount = (payload) => new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      name: 'promise rom',
      age: payload.age + 1,
    })

  }, 3000)
})

const AccountModel = {
  namespace: 'account',
  state: {
    name: 'rom',
    age: 21,
    languages: [
      "chinese",
      "english"
    ],
    stack: {
      js: true,
      python: false,
    }
  },
  effects: {
    *addAge({ payload }) {
      const account = yield call(getAccount, payload)
      console.log(account)
      yield put({
        type: 'account/changeState',
        payload: {
          ...account
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
