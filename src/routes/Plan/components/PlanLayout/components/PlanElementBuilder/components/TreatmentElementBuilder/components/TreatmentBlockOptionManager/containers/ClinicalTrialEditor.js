import { compose, withHandlers , withProps} from 'recompose';
import {ClinicalTrialForm, prepareOncologyInput} from "../../../../../../../../../../Health/components/Forms/components/ClinicalTrial/index";
import {modalHOC} from '../modal';

const enhance = compose(
    withProps(props => {
        // const  {chemotherapyElement=false} = props;
        // if (chemotherapyElement) {
        //     return {details:chemotherapyElement};
        // }
    }),
    withHandlers({
        prepareInput: props => values => {
            return prepareOncologyInput(values);
        }
    }),
    modalHOC
)
const TreatmentClinicalTrialEditor = enhance(ClinicalTrialForm);
export default TreatmentClinicalTrialEditor;