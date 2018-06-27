import React from 'react';
import {Card, Form, List, Button, Icon, Checkbox, Tooltip} from 'antd';

import TreatmentBlockManageOptionModal from './containers/TreatmentBlockManageOptionModal';
import TreatmentBlockOption from './containers/TreatmentBlockOption';
import { compose, withHandlers,  withState} from 'recompose';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};
const formTailLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20, offset: 4},
};


export const TreatmentBlockManagerPure = (props) => {
    const {planId, mode, treatmentId = '', openAddOption, details={}, k} = props;
    const {id, title='', options=[]} = details;
    return <Card title={title} extra={<Icon type="plus" onClick={props.onAddOption} />} >

        <List
            itemLayout="horizontal"
            dataSource={options}
            renderItem={(option, i) => (
                <TreatmentBlockOption planId={planId} treatmentId={treatmentId} blockId={id} mode={mode} details={option} />
            )}
        />

        {openAddOption && <TreatmentBlockManageOptionModal planId={planId} treatmentId={treatmentId} blockId={id} mode={mode} onHide={props.onHideOption} onElementAdd={props.onElementAdd} />}
    </Card>
}


export const prepareInput = (values) => {
    const {title, schedule, keys=[], ids=[]} = values;
    let {blocks=[], options:blockOptions=[]} = values;
    blocks = keys.map(i => {
        const id =  ids[i] || '';// ? timesPerHour[i]['id'] : '';
        const block = blocks[i] || '';
        const options = blockOptions[i] || [];
        return {id, 'title': block, options}
    });

    return {
        schedule:schedule,
        treatmentElement: {
            title:title,
            blocks,
        }
    }
}