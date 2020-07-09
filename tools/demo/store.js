import { createStore } from './coco-miniprogram';

import AccountModel from "./models/account";

const models = [
  AccountModel
]

const store = createStore(models)

export default store;
