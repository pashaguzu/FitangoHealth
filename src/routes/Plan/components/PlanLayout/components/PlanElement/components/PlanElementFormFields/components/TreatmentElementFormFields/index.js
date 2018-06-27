import React from 'react';
import { compose, branch, renderComponent, withHandlers , withState, defaultProps} from 'recompose';
import {prepareInput as input} from './components/TreatmentBlocks';
import TreatmentBlocks from './containers/TreatmentBlocks';
import TreatmentBlocksOptions from './containers/TreatmentBlocksOptions';


export const prepareInput = input;

const enhance = compose(
    //modalHOC,
    defaultProps({
        id: '',
    }),
    withState('step', 'setStep', 0),
    withState('details', 'setDetails', props => props.details),

    withHandlers({
        goTo: props => step => {
            // check if we've added at least one
            const callback = () => {
                props.setStep(step);
            };
            props.form.validateFields((err, values) => {
                //console.log(err);
                //console.log(values);
                //console.log(props.form.isFieldsTouched());
                if (!err) {
                    if (step === 1) {
                        //console.log(props);
                        // save blocks if they are new or has been edited
                        if (props.form.isFieldsTouched()) {
                            const saveCallback = (element) => {
                                console.log(element);
                                // save the new info
                                props.setDetails(element.itemInfo);
                                callback();
                            }
                            props.handleSave(saveCallback);
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
        onSubmit: props => event => {
            console.log(props);
            //props.form.setFieldsValue({blocks: [1,2,3]});
            //props.onHide();
        },
        next: props => event => {
            const current = props.step + 1;
            props.goTo(current);
        },
        prev: props => event => {
            const current = props.step - 1;
            props.goTo(current);
        },
    }),
    branch(props => {
        return props.step===1;
    }, renderComponent(TreatmentBlocksOptions)),
);


const TreatmentBlockManagerEnhanced = enhance(TreatmentBlocks);

export default TreatmentBlockManagerEnhanced;