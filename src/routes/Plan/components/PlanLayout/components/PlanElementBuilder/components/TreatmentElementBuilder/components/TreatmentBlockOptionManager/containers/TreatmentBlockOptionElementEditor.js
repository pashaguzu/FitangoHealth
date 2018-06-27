import { compose, branch, renderComponent, withHandlers , withProps, withState} from 'recompose';
import {TreatmentBlockElementEditorPure, prepareInput} from '../components/TreatmentBlockOptionElementEditor';
import {modalHOC} from '../modal';

const enhance = compose(
    withHandlers({
        prepareInput: props => values => {
            console.log(values);
            return prepareInput(values);
        }
    }),
    modalHOC
)
const TreatmentBlockElementEditor = enhance(TreatmentBlockElementEditorPure)
export default TreatmentBlockElementEditor;