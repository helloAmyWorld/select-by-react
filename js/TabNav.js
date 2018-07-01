import React, { Component, PropTypes, cloneElement } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { Motion, spring } from 'react-motion';
import InkBar from './InkBar';

function getOuterWidth(el) {
    return el.offsetWidth;
}

function getOffset(el) {
    const html = el.ownerDocument.documentElement;
    const box = el.getBoundingClientRect();
//获取的位置有误
    return {
        top: box.top + window.pageYOffset - html.clientTop,
        left: box.left + window.pageXOffset - html.clientLeft-394,
    };
}
class TabNav extends Component {
  static propTypes = {
    classPrefix: React.PropTypes.string,
    panels: PropTypes.node,
    activeIndex: PropTypes.number,
  };
    constructor(props) {
        super(props);
        this.state = {
            inkBarWidth: 0,
            inkBarLeft: 0,
        };
    }

    componentDidMount() {
        const { activeIndex } = this.props;
        const node = ReactDOM.findDOMNode(this);
        const el = node.querySelectorAll('li')[activeIndex];

        this.setState({
            inkBarWidth: getOuterWidth(el),
            inkBarLeft: getOffset(el).left,
        });
    }
    componentDidUpdate(prevProps) {
        if (prevProps.activeIndex !== this.props.activeIndex) {
            const { activeIndex } = this.props;
            const node = ReactDOM.findDOMNode(this);
            const el = node.querySelectorAll('li')[activeIndex];

            this.setState({
                inkBarWidth: getOuterWidth(el),
                inkBarLeft: getOffset(el).left,
            });
        }
    }

    getTabs() {
    const { data, classPrefix, activeIndex } = this.props;
   //返回一个数组
     var array=[ <span className="icon-font">&#xe96e;</span>,
         <span className="icon-font">&#xe972;</span>,
         <span className="icon-font">&#xe94a;</span>,
         <span className="icon-font">&#xe971;</span>,];
    return data.map((value,index) => {
      if (!value) { return; }
      let classes = classnames({
        [`${classPrefix}-tab`]: true,
        [`${classPrefix}-active`]: index ===activeIndex
      });
      let events = {};
        events = {
          onClick: this.props.onTabClick.bind(this, index),/*为每一个绑定点击事件*/
        };
      const ref = {};
      if (activeIndex ===index) {
        ref.ref = 'activeTab';
      }
      //补充内容
      return (
        <li
          role="tab"
          aria-selected={activeIndex ===index? 'true' : 'false'}
          {...events}
          className={classes}
          key={index}
          {...ref}
        >
            { array[index]}
            <div className="tabs-word">{value.title}</div>

        </li>
      );
    });
  }

  render() {
    const { classPrefix } = this.props;

    const rootClasses = classnames({
      [`${classPrefix}-bar`]: true,
    });

    const classes = classnames({
      [`${classPrefix}-nav`]: true,
    });

    return (
      <div className={rootClasses} role="tablist">
          <Motion style={{ left: spring(this.state.inkBarLeft) }}>
              {({ left }) => <InkBar width={this.state.inkBarWidth} left={left} />}
          </Motion>
        <ul className={classes}>
          {this.getTabs()}
        </ul>
      </div>
    );
  }
}

export default TabNav;
