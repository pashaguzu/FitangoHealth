import React from 'react';
import { compose, withHandlers, withState, withProps, branch, renderComponent} from 'recompose';
import BlankElementBuilder, {prepareInput} from '../components/BlankElementBuilder';
import {Form} from 'antd';
import {modalHOC, withSpinnerWhileLoading} from "../modal";


const enhance = compose(
    //withSpinnerWhileLoading,
    // withHandlers({
    //     prepareInput: props => values => {
    //         return prepareInput(values);
    //     },
    // }),

    withProps(props => {
        const type = props.type;
        let text = 'Wrong Element';

        switch(type) {
            case 'diagnosis':
                text = 'This is a placeholder for the diagnoses block';
                break;
            case 'cancer_stage':
                text = 'This is a placeholder for the staging block';
                break;
        }
        return {text};
    }),
    withHandlers({
        onSubmit: props => callback => {
            props.handleSave({prepareInput:prepareInput, callback:props.onHide} );
        },
        modalTitle: props => values => {
            const type = props.type;
            return props.id ? 'Edit '+type : 'Add '+type;
        },
    }),
    modalHOC,
)
export default Form.create()(enhance(BlankElementBuilder));