
import { effects } from './vendors/redux-saga.min';

const { put, call } = effects;

const updateData = (data, props) => {
  // Object.keys(props).forEach((key) => {
  //   if (data[key]) {
  //     console.warn(`${key} 已在 data 中存在，将被 props 同名数据覆盖。`)
  //   }
  // })
  data = {
    ...data,
    ...props,
  }
  return data;
}


const connectWrapper = (mapStateToProps, autoSetData = false) => {

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

  const onLoadWrapper = (that) => {
    app.store.subscribe(() => {
      console.log(that)
      console.log('数据更新', app.store.getState())
      const state = mapStateToProps(app.store.getState())
      that.props = {
        ...that.props,
        data: {
          ...state
        }
      }
      if (autoSetData) {
        // console.log(updateData(that.data, that.props.data))
        that.setData(updateData(that.data, that.props.data))
      }
    })
  }

  return (pageDef) => {
    const state = mapStateToProps(app.store.getState())
    // 注入 props
    pageDef.props = {
      data: {
        ...state,
      },
      dispatch,
    }

    // props.data 自动注入到 data 中
    if (autoSetData) {
      pageDef.data = updateData(pageDef.data, state)
    }

    return {
      ...pageDef,
      onLoad() {
        pageDef.onLoad && pageDef.onLoad()
        onLoadWrapper(this)
      },
      // onUnload,
      attached() {
        pageDef.attached && pageDef.attached()
        onLoadWrapper(this)
      }
    }
  }
}

export default connectWrapper;
