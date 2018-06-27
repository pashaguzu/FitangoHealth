import React from 'react';
import { compose, branch, renderComponent, withHandlers , withProps, withState} from 'recompose';

import ConditionElementOption from '../components/ConditionElementOptionActions';

const enhance = compose(
    withState('openAddOption', 'toggleAddOption', false),
    withHandlers({
        // add options
        onAddOption: props => event => {
            props.toggleAddOption(true);
        },
        // hide options
        onHideOption: props => event => {
            console.log(1111);
            props.toggleAddOption(false);
        },
    }),
);

const ConditionElementOptionEnhanced = enhance(ConditionElementOption);
export default ConditionElementOptionEnhanced;


