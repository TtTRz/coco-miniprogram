import connectWrapper from './connect_wrapper'
import createStoreWrapper from './createStore_wrapper'

const connect = connectWrapper;
const createStore = createStoreWrapper;


import { effects } from './vendors/redux-saga.min'

module.exports = {
  connect,
  createStore,
  effects,
}

