import React from 'react';
import TreatmentElementBlock from './TreatmentBlockOption';
import {List} from 'antd';
import {compose, withHandlers} from 'recompose';

const TreatmentBlockOptions = ({elements, planId, itemInfo, deleteTmpElement, mode, onElementUpdate}) => {
    return <List
        style={{marginTop:3}}
        size="small"
        itemLayout="horizontal"
        dataSource={elements}
        renderItem={(option, k) => {
            return <TreatmentElementBlock key={k} i={k} planId={planId} treatmentId={itemInfo.id} deleteTmpElement={deleteTmpElement} isBuilderMode mode={mode} option={option} onElementUpdate={onElementUpdate} />;
        }}
    />;
};

const enhance = compose(
    withHandlers({
        triggerChange: props => (changedValue) => {
            // Should provide an event to pass value to Form.
            const onChange = props.onChange;
            if (onChange) {
                onChange(Object.assign({}, this.state, changedValue));
            }
        }
    }),
)

export default enhance(TreatmentBlockOptions);
