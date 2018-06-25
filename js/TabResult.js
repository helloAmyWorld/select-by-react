import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
//就是个展示组件
class TabResult extends Component {
    static propTypes = {
        tab: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node,
        ]).isRequired,
        isActive: PropTypes.bool,
    };
    getResult(){
        const {data,classPrefix,activeIndex}=this.props;
        return data.map((value,index)=>{
            if (!value) { return; }
            const isActive = activeIndex === index;//是一个布尔值
            const classes = classnames({
               /* [className]: className,*/
                [`${classPrefix}-panel`]: true,
                [`${classPrefix}-active`]: isActive,
            });
            console.log(classes);

            return (
                <div
                    role="tabpanel"
                    className={classes}/*是一个数组*/
                    aria-hidden={!isActive}/*是否决定隐藏*/
                    key={index}>
                    {value.desc}
                </div>
            )
             });
    }
    render() {
        const { classPrefix } = this.props;
        const classes = classnames({
            [`${classPrefix}-content`]: true,
        });
        return (
            <div className={classes}>
                {this.getResult()}
            </div>
        );
    }
}

export default TabResult;
