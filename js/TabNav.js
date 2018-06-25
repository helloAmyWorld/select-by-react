import React, { Component, PropTypes, cloneElement } from 'react';
import classnames from 'classnames';

class TabNav extends Component {
  static propTypes = {
    classPrefix: React.PropTypes.string,
    panels: PropTypes.node,
    activeIndex: PropTypes.number,
  };
  getTabs() {
    const { data, classPrefix, activeIndex } = this.props;
   //返回一个数组
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
      return (
        <li
          role="tab"
          aria-selected={activeIndex ===index? 'true' : 'false'}
          {...events}
          className={classes}
          key={index}
          {...ref}
        >
          {value.title}
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
        <ul className={classes}>
          {this.getTabs()}
        </ul>
      </div>
    );
  }
}

export default TabNav;
