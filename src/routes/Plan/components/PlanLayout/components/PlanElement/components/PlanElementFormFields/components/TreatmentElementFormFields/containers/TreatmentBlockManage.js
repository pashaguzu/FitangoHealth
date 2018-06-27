import React from 'react';
import { compose, branch, renderComponent, withHandlers , withState, defaultProps} from 'recompose';
import {TreatmentBlockManagerPure } from '../components/TreatmentBlockManage';









const enhance = compose(

    withState('openAddOption', 'toggleAddOption', false),
    withHandlers({
        // add options
        onAddOption: props => event => {
            props.toggleAddOption(true);
        },
        // hide options
        onHideOption: props => event => {
            props.toggleAddOption(false);
        },
        // onSubmit111: props => event => {
        //     console.log('OnSubmit111', props);
        //     props.form.validateFields((err, values) => {
        //         console.log(values);
        //         const input = prepareInput(values);
        //         console.log(input);
        //     });
        // }
    }),
);

const TreatmentBlockManager = enhance(TreatmentBlockManagerPure);
export default TreatmentBlockManager;
//export const TreatmentBlockManagerForm = Form.create()(TreatmentBlockManager);

//
// //const TreatmentBlockEdit = TreatmentBlockManagerForm;
// //const TreatmentBlockAdd = TreatmentBlockManagerForm;
//
// // show Edit modal if we have ID
// /*const isEdit = (props) => {
//     //console.log(props);
//     const {id=''} = props;
//     return (id !== '');
// };*/
// // Enhance with state
// const enhance = compose(
//     //modalHOC,
//     defaultProps({
//         id: '',
//     }),
//     withState('id', 'setId', ({id}) => id),
//     //branch(isEdit, renderComponent(TreatmentBlockEdit)),
//     /*withHandlers({
//         onSubmit: props => event => {
//             console.log(props);
//             props.form.setFieldsValue({blocks: [1,2,3]});
//             props.onHide();
//         }
//     })*/
// );
//
//
// const TreatmentBlockManagerEnhanced = enhance(TreatmentBlockManagerForm);
//
// export default TreatmentBlockManagerEnhanced;