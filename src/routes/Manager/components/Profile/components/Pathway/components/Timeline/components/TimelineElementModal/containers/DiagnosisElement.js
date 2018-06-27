import React from 'react';
import Diagnoses from '../../../../../../../../../../Health/containers/Diagnoses';
import {modalHOC} from '../modal';
import {compose, withProps, withHandlers} from 'recompose';

const DiagnosisElement = (props) => {
    const {userId} = props;
    return <Diagnoses userId={userId} />;
}



const enhanceProps = compose(
    withProps(props => {
        const {details} = props;
        return {
            details: {
                ...details,
                id: '',
            },
            showNotes:false,
            useTimeline:false,
        }
    }),
    withHandlers({
        modalWidth: props => () => {
            return 800;
        }
    }),
    //enhance,
    withHandlers({
        onSubmit: props => callback => {
            //console.log(props);
            props.onHide();
            //
            // if (!props.id || props.form.isFieldsTouched()) {
            //     props.handleSave({prepareInput:()=>({}), callback:props.onHide} );
            // } else {
            //     props.onHide();
            // }
        },

    }),
    modalHOC
);

export default enhanceProps(DiagnosisElement);