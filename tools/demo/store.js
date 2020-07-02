import { createStore } from './Coco/index';

import AccountModel from "./models/account";

const models = [
  AccountModel
]

const store = createStore(models)

export default store;
