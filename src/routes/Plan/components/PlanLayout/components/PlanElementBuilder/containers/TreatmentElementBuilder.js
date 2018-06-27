import React from 'react';
import { compose, withHandlers, withState, withProps, branch, renderComponent} from 'recompose';
import TreatmentElementBuilderPure, {prepareInput} from '../components/TreatmentElementBuilder';
import {Form} from 'antd';
import {modalHOC, withSpinnerWhileLoading} from "../modal";

export const TreatmentElementBuilder = TreatmentElementBuilderPure;

export const enhance = compose(
    // withSpinnerWhileLoading,
    // current step
    //withState('step', 'setStep', 0),
    withState('elements', 'setElements', props => {
        //const {element={}} = props;
        //const {itemInfo:details={}} = element;
        const {elements = []} = props;
        return elements;
    }),

    // element details???
    withState('element', 'setElement', props => {
        //console.log(props);
        const {element={}} = props;
        return element;
    }),

    withProps(props => {
            //console.log(props);
            const {element={},  details={}} = props;
            const {itemInfo=details} = element;

            const {elements: els=[]} = details;
            const {elements} = props;
            const elementsToUse = elements.length > 0 ? elements : els;
            return {details:itemInfo, elements:elementsToUse};
        }
    ),

    withHandlers({
        prepareInput: props => values => {
            return prepareInput(values);
        },
    }),
    withHandlers({
        saveElement: props => callback => {
            const callbackSave = (element) => {
                // save the new info
                props.setElement(element);
                callback();
            }
            props.handleSave({prepareInput:props.prepareInput, callback:callbackSave} );
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
            return props.id ? 'Edit Treatment' : 'Add Treatment';
        },
    }),
    modalHOC,
)
export default enhanceWithModal(TreatmentElementBuilderPure);