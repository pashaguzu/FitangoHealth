import React from 'react';
import {compose, withHandlers} from 'recompose';
import LinkElementBuilderPure, {prepareInput} from '../components/LinkElementBuilder';
import {modalHOC} from "../modal";


export const LinkElementBuilder = LinkElementBuilderPure;

export const enhance = compose(
    withHandlers({
        onSubmit: props => callback => {
            console.log(props);
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
            return props.id ? 'Edit Link' : 'Add Link';
        },
    }),
    modalHOC,
);

export default enhanceWithModal(LinkElementBuilderPure);