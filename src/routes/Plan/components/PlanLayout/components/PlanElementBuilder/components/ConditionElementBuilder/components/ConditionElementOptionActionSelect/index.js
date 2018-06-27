import React from 'react';
import PlanElementSelect from '../../../../../PlanElement/components/PlanElementSelect';
import PlanElementBuilder from '../../../../../../containers/PlanElementBuilder';
import {modalHOC} from "../../../../modal";
import { compose, mapProps, withHandlers, branch, renderComponent, withState} from 'recompose';

const enhance = compose(
    withHandlers({
        modalTitle: props => values => {
            //console.log(props);
            return 'Select Action Element for '+props.option.label;
        },
        modalFooter: props => values => {
            return false;
        }

    }),
    modalHOC
);
const PlanElementSelectEnhanced = enhance(PlanElementSelect);




export const ConditionElementOptionActionSelect = (props) => {
    //console.log(props);
    return <React.Fragment>
        {props.type !== '' && <PlanElementBuilder {...props} />}
        <PlanElementSelectEnhanced {...props}  />
    </React.Fragment>
}

export default ConditionElementOptionActionSelect;