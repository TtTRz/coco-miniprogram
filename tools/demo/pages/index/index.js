import { connect } from '../../coco-miniprogram'

const mapStateToProps = ({ account }) => {
  // 在这里可以进行数据加工
  const newAge = account.age + 100
  // 当 store 更新时，return 的对象属性会自动 setData，导致视图渲染数据
  return {
    age: newAge
  }
}

const pageDef = {
  data: {
    name: 'rom',
  },
  showData: function() {
    console.log(this.data)
  },
  showProps: function() {
    console.log(this.props)
  },
  changeData: function () {
    this.props.dispatch({
      type: 'account/addAge',
      payload: {
        age: this.data.age,
      },
    })

  }
}

Page(connect(mapStateToProps, true)(pageDef))

