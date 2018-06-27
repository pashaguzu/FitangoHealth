import React from 'react';
import {Icon, List} from 'antd';
import ConditionElementOptionAction from './components/ConditionElementOptionAction';
import {EmptyList} from "../../../../../../../../../../components/Loading/index";

const ConditionElementOptionActions = (props) => {
    console.log(props);
    const {elements, loading} = props;
    if (loading) {
        return 'Loading...';
    }
    //const {planId, treatmentId, blockId, details, onEdit, onDelete, showEditModal, onHide, mode} = props;
    //const {id, type, description} = details;
    if (elements.length === 0) {
        return <EmptyList>Click + to add an Element</EmptyList>;
    }
    return  <List
        size="large"
        itemLayout="vertical"
        split={false}
        dataSource={elements}
        renderItem={element => {
            return <ConditionElementOptionAction {...props} element={element} />
        }} />;
}

export default ConditionElementOptionActions;