import { compose, withHandlers , withProps} from 'recompose';
import {OncologyForm, prepareOncologyInput} from "../../../../../../../../../../Health/components/Forms/components/Oncology/index";
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
const Enhanced = enhance(OncologyForm);
export default Enhanced;