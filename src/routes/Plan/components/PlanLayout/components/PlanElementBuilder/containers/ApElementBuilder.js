import React from 'react';
import { compose, withHandlers} from 'recompose';
import ApElementBuilderPure, {prepareInput} from '../components/ApElementBuilder';
import {modalHOC, withSpinnerWhileLoading} from "../modal";

export const ApElementBuilder = ApElementBuilderPure;

export const enhance = compose(
    withSpinnerWhileLoading,
    // withHandlers({
    //     prepareInput: props => values => {
    //         return prepareInput(values);
    //     },
    // }),
    withHandlers({
        onSubmit: props => callback => {
            props.handleSave({prepareInput, callback:props.onHide} );
        },
    }),
)


const enhanceWithModal = compose(
    enhance,
    withHandlers({
        modalTitle: props => values => {
            return props.id ? 'Edit ActionPlan' : 'Add ActionPlan';
        },
    }),
    modalHOC,
)

export default enhanceWithModal(ApElementBuilderPure);