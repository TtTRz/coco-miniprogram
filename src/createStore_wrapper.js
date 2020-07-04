
// 生成 reducers
import createSagaMiddleware, {effects} from './vendors/redux-saga.min';
import {applyMiddleware, compose, createStore} from './vendors/redux.min';

const { takeEvery } = effects;

const createStoreWrapper = (models) => {

  const sagaMiddleware = createSagaMiddleware()
  // 注册 models 的 reducers
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
      return {
        ...state,
        [namespace]: allRegisterReducers[type](state[namespace], payload)
      }
    }
  }
  // 初始化 store 数据
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
  // 注册 models 的 effects
  const rootSagaGenerator = (models) => {
    return function* rootSaga () {
      for (let modelsName in models) {
        if (models.hasOwnProperty(modelsName)) {
          const model = models[modelsName]
          for (let effectName in model.effects) {
            if (model.effects.hasOwnProperty(effectName))
              yield takeEvery(`${model.namespace}/${effectName}`.toUpperCase(), model.effects[effectName])
          }
        }
      }
    }
  }
  // 创建 store
  const store = createStore(
    reducer,
    initStoreGenerator(models),
    compose(
      applyMiddleware(sagaMiddleware)
    )
  )

  sagaMiddleware.run(rootSagaGenerator(models))

  return store;
}


export default createStoreWrapper

