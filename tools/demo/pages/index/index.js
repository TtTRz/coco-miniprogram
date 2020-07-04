import { connect } from '../../Coco/coco'

const mapStateToProps = ({ account }) => {
  return {
    age: account.age,
    name: account.name,
  }
}

const pageDef = {
  data: {
    name: 'rom'
  },
  onLoad() {
  },
  onShow() {
  },
  showData: function() {
    console.log(this.data)
  },
  showProps: function() {
    console.log(this.props)
  },
  changeStore: function() {

  },
  changeData: function () {
    this.props.dispatch({
      type: 'account/addAge',
      payload: {
        age: this.data.age + 1,
      },
    })
  }
}

Page(connect(mapStateToProps, true)(pageDef))

