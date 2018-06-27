import React from 'react';
import { compose, withHandlers, withProps} from 'recompose';
import ClinicalNoteElementBuilderPure, {prepareInput} from '../components/ClinicalNoteElementBuilder';
import {Form} from 'antd';
import {modalHOC, withSpinnerWhileLoading} from "../modal";

export const ClinicalNoteElementBuilder = ClinicalNoteElementBuilderPure;

export const enhance = compose(
    withSpinnerWhileLoading,
    withHandlers({
        onSubmit: props => callback => {
            if (1===1 || !props.id || props.form.isFieldsTouched()) {
                props.handleSave({prepareInput, callback:props.onHide} );
            } else {
                props.onHide();
            }
        },
    }),
)


const enhanceWithModal = compose(
    enhance,
    withHandlers({
        modalTitle: props => values => {
            return props.id ? 'Edit Clinical Note' : 'Add Clinical Note';
        },
    }),
    modalHOC,
)

export default enhanceWithModal(ClinicalNoteElementBuilderPure);