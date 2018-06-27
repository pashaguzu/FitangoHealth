import React from 'react';
import { compose, branch, renderComponent, withHandlers , withProps, withState} from 'recompose';

import TreatmentBlockOption from '../components/TreatmentBlockOption';
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

export default enhance(TreatmentBlockOption);


