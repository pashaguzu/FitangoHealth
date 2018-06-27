import React from 'react';
import { compose, branch, renderComponent, withHandlers , withProps, withState} from 'recompose';

import TreatmentElementBlock from '../../../../../../../components/Plan/components/TreatmentElement/components/TreatmentElementBlock';

import {withDeleteMutation} from './mutations';

const enhance = compose(
    withState('showEditModal', 'toggleEditModal', false),
    withDeleteMutation,
    withHandlers({
        onEdit: props => callback => {
            //console.log(props);
            props.toggleEditModal(true);
        },
        onHide: props =>callback => {
            props.toggleEditModal(false);
        },
    }),
    withHandlers({
        onDelete: props => callback => {
            if (props.option.id !== '') {
                props.deleteElement().then(() => {
                    //props.onHide();
                });
            } else {
                props.deleteTmpElement(props.option);
            }
        }
    })
);

export default enhance(TreatmentElementBlock);


