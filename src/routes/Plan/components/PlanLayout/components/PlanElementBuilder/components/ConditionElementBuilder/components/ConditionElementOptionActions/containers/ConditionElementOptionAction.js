import React from 'react';
import { compose, branch, renderComponent, withHandlers , withProps, withState} from 'recompose';

import ConditionElementOptionAction from '../components/ConditionElementOptionAction';
import {withDeleteMutation} from './mutations';


const enhance = compose(
    withState('showEditModal', 'toggleEditModal', false),
    withDeleteMutation,
    withHandlers({
        onEdit: props => callback => {
            props.toggleEditModal(true);
        },
        onHide: props =>callback => {
            props.toggleEditModal(false);
        },
        onDelete: props => callback => {
            props.deleteElement();
        }

    })
);

export default enhance(ConditionElementOptionAction);


