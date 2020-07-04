import { createStore } from './Coco/coco';

import AccountModel from "./models/account";

const models = [
  AccountModel
]

const store = createStore(models)

export default store;
