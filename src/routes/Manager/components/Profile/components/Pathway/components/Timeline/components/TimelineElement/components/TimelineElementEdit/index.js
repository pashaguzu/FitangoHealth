import React from 'react';
import {Tooltip, Icon} from 'antd';
import {TimelineElementModalWithMutation as TimelineElementModal} from "../../../../containers/TimelineElementModal";


const TimelineElementEditPure = props => {
    const {edit, openEdit, closeEdit, item, userId} = props;
    //const {activity} = element;
    //console.log(item.type);
    return <React.Fragment>
        {edit && <TimelineElementModal userId={userId} item={item} onHide={closeEdit} />}
        <Tooltip title="Edit Element" ><Icon type="edit" onClick={openEdit} style={{marginRight:5}} /></Tooltip>
    </React.Fragment>;
}

export default TimelineElementEditPure;
