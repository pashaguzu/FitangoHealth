import React from 'react';
import {compose, withHandlers} from 'recompose';
import LineElementBuilderPure, {prepareInput} from '../components/LineElementBuilder';
import {modalHOC, withSpinnerWhileLoading} from "../modal";


export const LineElementBuilder = LineElementBuilderPure;

export const enhance = compose(
    withSpinnerWhileLoading,
    withHandlers({
        onSubmit: props => callback => {
            if (!props.id || props.form.isFieldsTouched()) {
                props.handleSave({prepareInput:prepareInput, callback:props.onHide} );
            } else {
                props.onHide();
            }
        },
    }),
);

const enhanceWithModal = compose(
    enhance,
    withHandlers({
        modalTitle: props => values => {
            return props.id ? 'Edit Line' : 'Add Line';
        },
    }),
    modalHOC,
);

export default enhanceWithModal(LineElementBuilderPure);