import React from 'react';
import {compose, withHandlers} from 'recompose';
import TextElementBuilderPure, {prepareInput} from '../components/TipboxElementBuilder';
import {modalHOC, withSpinnerWhileLoading} from "../modal";


export const TextElementBuilder = TextElementBuilderPure;

export const enhance = compose(
    // withSpinnerWhileLoading,
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
            return props.id ? 'Edit Tipbox' : 'Add Tipbox';
        },
    }),
    modalHOC,
);

export default enhanceWithModal(TextElementBuilderPure);