import React from 'react';
import {Card, Button} from 'antd';
import ConditionElementOptionActions from '../../components/ConditionElementOptionActions';
import ConditionElementOptionActionSelect from '../../containers/ConditionElementOptionActionSelect';
import PlanElementBuilder from '../../../../../../containers/PlanElementBuilder';



export const ConditionElementOption = (props) => {
    //console.log(props);
    const {option} = props;
    return <Card title={option.label} type="option" extra={<Button icon="plus" size="small" onClick={props.onAddOption} />} >

        <ConditionElementOptionActions {...props} />


        {(props.openAddOption) && <ConditionElementOptionActionSelect {...props} parentId={props.element.id} parentValue={option.value} onHide={props.onHideOption} />}
    </Card>
    }


export default ConditionElementOption;