import React from 'react';
import {Icon, List} from 'antd';
import PlanElement from '../../../../../../../../components/PlanElement';

const ConditionElementOptionAction = (props) => {
    console.log(props);
    //const {planId, treatmentId, blockId, details, onEdit, onDelete, showEditModal, onHide, mode} = props;
    const {element} = props;
    return <List.Item
            key={element.id}
            /*actions={[<Icon type="edit" onClick={onEdit} />, <Icon type="delete" onClick={onDelete} />]}*/
            >
            <PlanElement {...props} />
        </List.Item>;
}

export default ConditionElementOptionAction;