import ClinicalTrialSelect, {prepareInput} from "../../../../../../../../ClinicalTrials/components/ClinicalTrialSelect/index";
import {modalHOC} from '../modal';
import {compose, withProps, withHandlers} from 'recompose';

const enhanceProps = compose(
    // withProps(props => {
    //     const {details} = props;
    //     return {
    //         details: {
    //             ...details,
    //             id: '',
    //         },
    //         showNotes:false
    //     }
    // }),
    //enhance,
    withHandlers({
        onSubmit: props => callback => {
            if (!props.id || props.form.isFieldsTouched()) {
                props.handleSave({prepareInput:prepareInput, callback:props.onHide} );
            } else {
                props.onHide();
            }
        },

    }),
    modalHOC
)

export default enhanceProps(ClinicalTrialSelect);