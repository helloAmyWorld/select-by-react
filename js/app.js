import React, { Component, PropTypes, cloneElement } from 'react';
import ReactDOM from 'react-dom';
import Tabs from './Tabs';
import TabResult from './TabResult';
//这里需要读入数据，确定每个选项框的内容

class App extends Component {
  constructor(props) {
    super(props);
    //state为当前选中项
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      activeIndex: 0,
    };
  }
  handleChange(activeIndex) {
    this.setState({
      activeIndex: activeIndex,
    });
  }

  render() {
    //传入默认选中的项目
    // 如果想要作用的话，要把 defaultActiveIndex 改成 activeIndex 就可以
      var imageDatas = require('../data/imageDatas.json');//获取微信的选框的数据
    return (
      <div className="tabs-bar ui-tabs">
          <TabResult activeIndex={this.state.activeIndex} classPrefix='tabs' data={imageDatas}></TabResult>
          <Tabs defaultActiveIndex={this.state.activeIndex} className="tabs-bar"  classPrefix='tabs' data={imageDatas} onChange={this.handleChange}></Tabs>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
