import { compose, branch, renderComponent, withHandlers , withProps, withState} from 'recompose';
import {TreatmentChemotherapyElementEditorPure, prepareInput} from '../components/TreatmentChemotherapyElementEditor';
import {modalHOC} from '../modal';

const enhance = compose(
    withProps(props => {
        const  {chemotherapyElement=false} = props;
        if (chemotherapyElement) {
            return {details:chemotherapyElement};
        }
       //chemotherapyElement
    }),
    withHandlers({
        prepareInput: props => values => {

            //console.log(values);
            return prepareInput(values);
        }
    }),
    modalHOC
)
const TreatmentChemotherapyElementEditor = enhance(TreatmentChemotherapyElementEditorPure)
export default TreatmentChemotherapyElementEditor;