import React from 'react';
import { compose, withHandlers, withState, withProps, branch, renderComponent} from 'recompose';
import ChecklistElementBuilderPure, {prepareInput} from '../components/ChecklistElementBuilder';
import {modalHOC, withSpinnerWhileLoading} from "../modal";

export const ChecklistElementBuilder = ChecklistElementBuilderPure;

export const enhance = compose(
    //withSpinnerWhileLoading,
    /*withProps(props => {
            //console.log(props);
            const {element={}, details={}} = props;
            const {itemInfo=details} = element;
            return {details:itemInfo};
        }
    ),*/
    withHandlers({
        prepareInput: props => values => {
            return prepareInput(values);
        },
    }),
    withHandlers({
        saveElement: props => callback => {

            if (1===1 || !props.id || props.form.isFieldsTouched()) {
                props.handleSave({prepareInput:prepareInput, callback} );
                //const valuesPrepared = props.prepareInput(values);
                //props.handleSave({prepareInput:prepareInput, callback:props.onHide} );
                //props.handleSave({input:valuesPrepared, callback} );
            } else {
                callback()
            }
        }
    }),
    withHandlers({
        onSubmit: props => event => {
            props.saveElement(props.onHide);
        },
    }),
)


const enhanceWithModal = compose(
    enhance,
    withHandlers({
        modalTitle: props => values => {
            const typeFormatted = props.type === 'condition' ? 'To Do' : 'To Do';
            return props.id ? 'Edit ' + typeFormatted : 'Add ' + typeFormatted;
        },

    }),
    modalHOC,
)

export default enhanceWithModal(ChecklistElementBuilderPure);