import connectWrapper from './connect_wrapper'
import createStoreWrapper from './createStore_wrapper'

const connect = connectWrapper;
const createStore = createStoreWrapper;

export {
  connect,
  createStore
}
