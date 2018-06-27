import React from 'react';
import {Tooltip, Icon} from 'antd';



const TimelineElementDeletePure = props => {
    const {deleteElement} = props;
    return <Tooltip title="Delete Element" ><Icon type="delete" onClick={deleteElement} /></Tooltip>;;
}

export default TimelineElementDeletePure;
