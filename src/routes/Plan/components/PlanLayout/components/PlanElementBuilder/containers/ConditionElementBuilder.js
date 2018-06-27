import React from 'react';
import {Form, Button} from 'antd';
import { compose, withHandlers, withState, withProps, branch, renderComponent} from 'recompose';
import ConditionElementBuilder, {prepareInput} from '../components/ConditionElementBuilder';
import ConditionElementOptions  from '../components/ConditionElementBuilder/components/ConditionElementOptions';
import {modalHOC, withSpinnerWhileLoading} from "../modal";


const enhance = compose(
    withSpinnerWhileLoading,
    // current step
    withState('step', 'setStep', 0),

    // element details???
    withState('element', 'setElement', props => {
        //console.log(props);
        const {element={}} = props;
        return element;
    }),
    withProps(props => {
        //console.log(props);
        const {element={}, details={}} = props;
        const {itemInfo=details} = element;
        return {details:itemInfo};
        }
    ),
    // withHandlers({
    //     prepareInput: props => values => {
    //         console.log(values);
    //         return prepareInput(values);
    //     },
    // }),
    withHandlers({
        saveElement: props => callback => {
            const {step} = props;

            props.form.validateFields((err, values) => {

                if (!err) {
                    if (step === 0) {
                        //console.log(props);
                        // save blocks if they are new or has been edited

                        if (props.form.isFieldsTouched()) {
                            const callbackSave = (element) => {
                                console.log(element);
                                // save the new info
                                props.setElement(element);
                                callback();
                            }
                            props.handleSave({prepareInput:prepareInput, callback: callbackSave} );
                        } else {
                            callback()
                        }
                    } else {
                        callback()
                    }
                }
            });
        }
    }),
    withHandlers({
        goTo: props => step => {
            // check if we've added at least one
            const callbackStep = () => {
                props.setStep(step);
            };
            props.saveElement(callbackStep);
        },
    }),
    withHandlers({
        onSubmit: props => event => {
            props.saveElement(props.onHide);
        },
        next: props => event => {
            const current = props.step + 1;
            props.goTo(current);
        },
        prev: props => event => {
            const current = props.step - 1;
            props.goTo(current);
        },
        onCancel: props => event => {
            props.onHide();
        },


    }),
    withHandlers({
        modalTitle: props => values => {
            const {step} = props;
            if (step === 0) {
                const typeFormatted = props.type === 'condition' ? 'Conditional' : 'Decision';
                return props.id ? 'Edit ' + typeFormatted : 'Add ' + typeFormatted;
            } else {
                return props.element.itemInfo.label;
            }
        },
        /*modalFooter: props => values => {
            const {step} = props;
            if (step === 0) {
                return [
                    <Button key="cancel" onClick={props.onCancel}>Cancel</Button>,
                    <Button key="next" type="primary" onClick={props.next}>Next</Button>
                ]
            } else if (step === 1) {
                return [
                    <Button key="back" onClick={props.prev}>Back</Button>,
                    <Button key="save" type="primary" onClick={props.onSubmit}>Save</Button>
                ]
            }
        },*/
    }),
    modalHOC,
    branch(props => {
        return props.step===1;
    }, renderComponent(ConditionElementOptions)),


)
export default enhance(ConditionElementBuilder);