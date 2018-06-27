import React from 'react';
import {compose, withHandlers} from 'recompose';
import TextInputElementBuilderPure, {prepareInput} from '../components/TextInputElementBuilder';
import {modalHOC} from "../modal";


export const TextInputElementBuilder = TextInputElementBuilderPure;

export const enhance = compose(
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
            return props.id ? 'Edit Text' : 'Add Text';
        },
    }),
    modalHOC,
);

export default enhanceWithModal(TextInputElementBuilderPure);