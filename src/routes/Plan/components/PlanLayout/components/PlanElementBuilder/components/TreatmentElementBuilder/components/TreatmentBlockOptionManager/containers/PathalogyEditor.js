import { compose, withHandlers , withProps} from 'recompose';
import {PathologyForm, preparePathologyInput} from "../../../../../../../../../../Health/components/Forms/components/Pathology/index";
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
            return preparePathologyInput(values);
        }
    }),
    modalHOC
)
const Enhanced = enhance(PathologyForm);
export default Enhanced;