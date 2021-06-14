import React, { Component } from 'react'
import test from '@/views/test'

class Index extends Component {
  constructor(props) {
    super(props)
    //  this.state = { a: '1' };
  }
  render() {
    // console.log(aa);
    return <div>121{test()}</div>
  }
}
export default Index
