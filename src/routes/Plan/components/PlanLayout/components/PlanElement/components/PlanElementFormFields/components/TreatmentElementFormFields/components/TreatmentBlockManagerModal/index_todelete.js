import React from 'react';
import { compose, branch, renderComponent, withHandlers , withState, defaultProps} from 'recompose';
import {TreatmentBlockManagerForm } from './components/TreatmentBlockManager';


const TreatmentBlockEdit = TreatmentBlockManagerForm;
const TreatmentBlockAdd = withMutation(TreatmentBlockManagerForm);

// show Edit modal if we have ID
const isEdit = (props) => {
    console.log(props);
    const {id=''} = props;
    return (id !== '');
};
// Final enhancement
const enhance = compose(
    //modalHOC,
    defaultProps({
        id: '',
    }),
    withState('id', 'setId', ({id}) => id),
    branch(isEdit, renderComponent(TreatmentBlockEdit)),
    /*withHandlers({
        onSubmit: props => event => {
            console.log(props);
            props.form.setFieldsValue({blocks: [1,2,3]});
            props.onHide();
        }
    })*/
);


const TreatmentBlockManagerEnhanced = enhance(TreatmentBlockAdd);

export default TreatmentBlockManagerEnhanced;