import React from 'react';
import { compose, mapProps, withHandlers, branch, renderComponent, withState} from 'recompose';

import ConditionElementOptionActionSelect from '../components/ConditionElementOptionActionSelect';



// const enhanceBuilder = compose(
//     modalHOC
// )
//
// const PlanElementBuilderEnhanced = enhanceBuilder(PlanElementBuilder);
const enhance = compose(
    withState('type', 'setType', ''),
    mapProps((props) => {
        console.log(props);
        //const {id='', mode} = props;
        //const parentId = '';
        const resetFields = {id:'', element:{}, details:{}};
        return {
            ...props,
            ...resetFields
          //  parentId:parentId
        }
    }),
    /*branch(props => {
        //console.log(props)
        return props.type !=='';
    }, renderComponent(PlanElementBuilder)),*/
    //withState('openAddOption', 'toggleAddOption', false),
    withHandlers({
        // add options
        onSelect: props => type => {
            //console.log(type);
            props.setType(type);
        },
        onHide: props => type => {
            props.onHide();
        },
    }),
);

export default enhance(ConditionElementOptionActionSelect);


