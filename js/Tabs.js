import React, { Component, PropTypes} from 'react';
import styles from '../css/style.scss';
import classnames from 'classnames';
import TabNav from './TabNav';
/*生成下方导航条*/
class Tabs extends Component {
  static propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    defaultActiveIndex: PropTypes.number,
    activeIndex: PropTypes.number,
    onChange: PropTypes.func,
  };
/*这里定义希望可以传数据到上一层*/
  static defaultProps = {
    classPrefix: 'tabs',
    onChange: () => {},
  };

  constructor(props) {
    super(props);

    const currProps = this.props;

    this.handleTabClick = this.handleTabClick.bind(this);
    let activeIndex;
    if ('defaultActiveIndex' in currProps) {
      activeIndex = currProps.defaultActiveIndex;
    }
    this.state = {
      activeIndex,
      prevIndex: activeIndex,
    };
  }
  /*检查收到的Prop和目前默认的p'rops是否发生改变*/
  componentWillReceiveProps(nextProps) {
    if ('activeIndex' in nextProps) {
      this.setState({
        activeIndex: nextProps.activeIndex,
      });
    }
  }

  handleTabClick(activeIndex) {
    const prevIndex = this.state.activeIndex;
     //表示选中的和当前的不相同，不相同则不需要更改
    if (this.state.activeIndex !== activeIndex) {
      this.setState({
        activeIndex,
        prevIndex,
      });
      this.props.onChange.bind(this, activeIndex);/*继续向上传递，当前和上一次的情况*/
    }
  }

  renderTabNav() {

    const { classPrefix, data } = this.props;

    return (
      <TabNav
        key="tabBar"
        classPrefix={classPrefix}
        onTabClick={this.handleTabClick}
        activeIndex={this.state.activeIndex}
        data={data}
      />
    );
  }
    render() {
        const { className } = this.props;
        const cx = classnames(className,'result');
        return (
            <div  className={cx}>
                {this.renderTabNav()}
            </div>
        );
    }
}

export default Tabs;
