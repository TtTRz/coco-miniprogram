import { connect} from '../../../Coco/index'

const componentDef = {
  data: {
  },
}


Component(connect((state) => {
  return {
    age: state.account.age
  }
}, true)(componentDef))
