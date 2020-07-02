import { createStore, applyMiddleware, compose} from './libs/vendors/redux.min'

import createSagaMiddleware, {effects} from './libs/vendors/redux-saga.min';

const { takeEvery } = effects;


import AccountModel from "./models/account";

const models = [
  AccountModel
]


// 生成 reducers
const reducersGenerator = (models) => {
  const reducers = {}
  models.forEach((model) => {
    Object.keys(model.reducers).forEach((reducerName) => {
      reducers[`${model.namespace}/${reducerName}`.toUpperCase()] = model.reducers[reducerName]
    })
  })
  return reducers
}


const reducer = function(state, action) {
  const { payload, isEffect } = action;
  const type = action.type.toUpperCase()
  const allRegisterReducers = reducersGenerator(models)
  if (isEffect) {
    return state
  } else {
    if (!allRegisterReducers[type]) {
      console.warn(`尚未注册当前reducer：${type}`)
      return state
    } 
    const namespace = type.split('/')[0].toLowerCase()
    const updatedState = {
      ...state,
      [namespace]: allRegisterReducers[type](state[namespace], payload)
    }
    console.log(updatedState)
    return updatedState
  }
}


const sagaMiddleware = createSagaMiddleware()


// 封装
const initStoreGenerator = (models) => {
  const initStore = {}
  models.forEach((item) => {
    if (initStore[item.namespace]) {
      console.warn(`请勿重复注册 model: ${item.namespace}`)
    } else {
      initStore[item.namespace] = item.state
    }
  }) 
  return initStore
}
//


const store = createStore(
  reducer, 
  initStoreGenerator(models),
  compose(
    applyMiddleware(sagaMiddleware)
  )
)


// 生成 rootSaga
const rootSagaGenerator = (models) => {
  return function* rootSaga () {
    for (let modelsName in models) {
      const model = models[modelsName]
      for (let effectName in model.effects) {
        yield takeEvery(`${model.namespace}/${effectName}`.toUpperCase(), model.effects[effectName])
      }
    }
  }
}
//


sagaMiddleware.run(rootSagaGenerator(models))



export default store;