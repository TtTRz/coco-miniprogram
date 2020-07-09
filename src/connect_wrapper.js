import shallowEqual from './utils/shallowEqual';


const updateData = function(data, props) {

  let shouldUpdateData = !shallowEqual({...data}, {...props})


  if (shouldUpdateData) {
    this.setData({
      ...data,
      ...props,
    })
  }
}



const connectWrapper = (mapStateToProps, autoSetData = true) => {

  if (!mapStateToProps instanceof Function) {
    console.error('mapStateToProps is not a function!')
    return
  }

  const app = getApp();

  const dispatch = (dispatchDef = {}) => {
    if (!dispatchDef.type) {
      console.warn('dispatch.type 不能为空！')
      return;
    }

    const type = dispatchDef.type.toUpperCase()

    app.store.dispatch({
      type,
      isEffect: true,
      payload: dispatchDef.payload,
    })
  }

  return (pageDef) => {

    const state = mapStateToProps(app.store.getState())

    // 注入 props
    pageDef.props = {
      data: state,
      dispatch,
    }

    // props.data 自动注入到 data 中
    if (autoSetData) {
      pageDef.data = {
        ...pageDef.data,
        ...state,
      }
    }

    const onLoadWrapper = function() {

      if (pageDef.onLoad && typeof pageDef.onLoad === 'function') {
        pageDef.onLoad()
      }

      this.__storeUnsubscribe__ = app.store.subscribe(() => {
        console.log('nextStore:', app.store.getState())
        const state = mapStateToProps(app.store.getState())

        this.props = {
          ...this.props,
          data: state,
        }

        if (autoSetData) {
          updateData.call(this, this.data, this.props.data)
        }
      })
    }

    const onUnloadWrapper = function() {
      if (pageDef.onUnload && typeof pageDef.onUnload === 'function') {
        pageDef.onUnload()
      }
      this.__storeUnsubscribe__()
    }

    return {
      ...pageDef,
      onLoad() {
        onLoadWrapper.call(this)
      },
      attached() {
        onLoadWrapper.call(this)
      },
      onUnload() {
        onUnloadWrapper.call(this)
      },
      detached() {
        onUnloadWrapper.call(this)
      }
    }
  }
}

export default connectWrapper;
