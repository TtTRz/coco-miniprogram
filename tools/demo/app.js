import store from './store'

App({
  onLaunch: function () {
    console.log('onLaunch')
  },
  //全局 Store
  store: store
})