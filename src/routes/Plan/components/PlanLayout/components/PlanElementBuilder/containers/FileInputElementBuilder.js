import React from 'react';
import {compose, withHandlers} from 'recompose';
import FileInputElementBuilderPure, {prepareInput} from '../components/FileInputElementBuilder';
import {modalHOC, withSpinnerWhileLoading} from "../modal";


export const FileInputElementBuilder = FileInputElementBuilderPure;

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
            return props.id ? 'Edit File' : 'Add File';
        },
    }),
    modalHOC,
);

export default enhanceWithModal(FileInputElementBuilderPure);