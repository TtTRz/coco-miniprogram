import { connect} from '../../../Coco/coco'

const componentDef = {
  data: {
  },
}


Component(connect((state) => {
  return {
    age: state.account.age
  }
}, true)(componentDef))
