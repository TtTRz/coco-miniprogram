import { connect } from '../../../coco-miniprogram'

const componentDef = {
  data: {
  },
}


Component(connect((state) => {
  return {
    age: state.account.age
  }
}, true)(componentDef))
