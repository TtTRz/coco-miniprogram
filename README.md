# Coco-miniprogram
小程序状态管理方案

## 简介
目标：用简单的 API 代替 Redux 繁琐的写法，实现小程序的状态管理。

目前处于初期阶段，可能后期变化较大，欢迎各位大佬指导交流！





基于 Redux、Redux-Saga 封装，实现思路参考 Dva.js。

## 安装

### 方法一：本地编译
clone 本仓库

在根目录运行 `npm run build`

会在 `/dist` 文件夹下生成 `coco.js`

在小程序中以 `import/require` 的形式引入

### 方法二：npm 安装

在小程序根目录 

`npm install coco`

## 体验 Demo
使用方法一后，直接用小程序工具把 `/stc/tools/dmeo` 作为根目录即可体验。

## 快速开始
API 设计思路在 Dva 的基础上做了修改，但大体上暂时保持一致。

小程序目录推荐为：
```javascript
src // 小程序根目录
 |-- models
       |-- accountModel.js
			 .... // 所有模块的 models
 |-- services
			 |-- accountServices.js
       .... // 异步请求文件
 |-- pages
 	     |-- index.js
			 |-- index.wxml
       |-- index.wxss
			 |-- index.json
			 .... // 小程序的页面/组件目录
 |-- app.js  
 |-- app.json
 |-- app.wxss
 |-- store.js

```

### 创建 model

```javascript
// models/accountModel.js
import { effects } from 'coco'

const { call, put } = effects;

/* 
* 这里推荐在 services 文件夹下创建 service 去处理异步网络请求
* 这里使用 promise + setTimeout 模拟
*/
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
  },
  effects: {
    // 该 models 下的 effect 函数，可以在页面/组件通过 dispatch 调用
    *addAge({ payload }) {
      // 触发异步请求
      const account = yield call(getAccount, payload)
      // 异步请求结束后触发 reducer
      // 需要在 type 指定 'model/reducer'
      yield put({
        type: 'account/changeState',
        payload: {
          ...account
        }
      })
    }
  },
  reducers: {
    /* 通过reducer 修改 store 下该模块的内容
    *  state 为该模块原本在 store 的数据副本
    *  payload 为 effect 触发该 reducer 时传入的数据
    *  reducer 返回一个对象将直接作用于 store 下该模块的数据
    */
    changeState: (state, payload) => {
      return {
        ...state,
        ...payload,
      }
    },
  }
}

export default AccountModel;
```

### 创建 store

```javascript
// store.js 
// 推荐在根目录下创建
import { createStore } from 'coco'; // 引入 coco

import AccountModel from "./models/account";  // 引入 model

const models = [ AccountModel ]  // 注册所有的 models

const store = createStore(models) // 调用 createStore 创建 store

export default store;
```

###  在 app.js 中引入

```javascript
// app.js
import store from './store'

App({
  onLaunch: function () {
    console.log('onLaunch')
  },
  //全局 Store
  store: store
})
```

### 在页面中使用

```javascript
import { connect } from 'coco'

// 该函数接受一个参数，该参数为全局 store 的副本，可以在函数题内部获取 store 的值
// 注意！在这里直接修改 store 并不会引发数据更新！！
const mapStateToProps = ({ account }) => {
  // 在这里可以进行数据加工
  const newAge = account.age + 100
  // 当 store 更新时，return 的对象属性会自动 setData，导致视图渲染数据
  return {
    age: newAge
  }
}

// page 定义
const pageDef = {
  data: {
    name: 'rom',
  },
  changeData: function() {
    // 在页面使用 dispatch
    this.props.dispatch({
      type: 'account/addAge',
      payload: {
        age: this.data.age,
      },
    })
  }
}

/* 使用 connect 将 mapStateToProps 与 page 绑定
*  并且会往页面的 this 中注入 props 属性，props 中拥有 dispatch 与 data 两个字段
*  调用 dispatch 可以直接触发指定的 effect
*  当 connect 函数第二个参数为 false 的时候，即关闭 autoSetData（默认为 true 开启）
*  这时候 store 的数据更新并不会引起页面的setData，数据只会更新到 this.props.data, 需要开发者自行 setData，这时候this.data 是 this.props.data 的子集
*  当 autoSetData 为true，this.props.data 和 data 会保持同步，并没有任何区别
*/ 
Page(connect(mapStateToProps)(pageDef))

```

这时候只需要触发  `changeData`  所有使用 `connect` 绑定过的页面，如果使用到了 account 下的数据，都会进行数据更新，如果开启 `autoSetData` ，将会进行自动的渲染更新。



## Features & Bugs

* 目前的方案高度依赖 Redux & Redux-Saga，但在小程序上其实表现并不好。

* Dva.js 的 Api 设计风格较为简约，但在小程序上仍有提升的空间。
* 目前的数据订阅用的是 Redux 的 subscribe 实现的，只要全局 store 的数据改变，会触发所有 `onLoad` 界面/组件的数据更新，这里考虑在页面的数据订阅阶段，即 `connect` 阶段做一次颗粒度更小的数据依赖收集，需要时考虑自行实现这块逻辑。

*目前该库属于试验 demo 阶段，如有更好的设计理念或者有类似相关的实现的话，欢迎指导交流！！相互学习！！*



