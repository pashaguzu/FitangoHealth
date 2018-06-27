import React from 'react';
import {Avatar} from 'antd';

export const PlanAvatar = ({plan={}}) => {
    const {thumb:{medium=''}, title=''} = plan;
    return <span><Avatar src={medium} size="large" shape="square" /> {title}
        </span>;
}