import React, { Component, PropTypes} from 'react';

import classnames from 'classnames';
import styles from '../css/style.scss';

class InkBar extends Component {
  render() {
    const { left, width } = this.props;
    return (
      <div className="inkBar" style={{
        WebkitTransform: `translate3d(${left}px, 0, 0)`,/*兼容*/
        transform: `translate3d(${left}px, 0, 0)`,
        width: width,
      }}>
      </div>
    );
  }
}
export default InkBar;
