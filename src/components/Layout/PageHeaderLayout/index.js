import React from 'react';
import {Affix} from 'antd';
import {compose, withState, withHandlers} from 'recompose';
import './index.less';
import {PageHeader} from "../PageHeader/index";

export const PageHeaderLayoutPure = ({ children, wrapperClassName, top, onChange, mainAffix=false, ...restProps }) => {
    let header = false;
    if (mainAffix) {
        header = <Affix onChange={onChange} offsetTop={0}>
            <PageHeader key="pageheader" {...restProps} />
        </Affix>
    } else {
        header = <PageHeader key="pageheader" {...restProps} />
    }

    return <div className={wrapperClassName}>
        {top}
        {header}
        {children ? <div className="pageContent">{children}</div> : null}
    </div>
};

const enhance = compose(
    withState('isCollapsed', 'setSimple', false),
    withHandlers({
        onChange: props => (affixed) => {
            if (affixed) {
                props.setSimple(true);
            } else {
                props.setSimple(false);
            }
        }
    })
);
export const PageHeaderLayout = enhance(PageHeaderLayoutPure);