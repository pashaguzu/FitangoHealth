import { compose, withHandlers , withProps} from 'recompose';
import {RadiologyForm, prepareRadiologyInput} from "../../../../../../../../../../Health/components/Forms/components/Radiology/index";
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
            return prepareRadiologyInput(values);
        }
    }),
    modalHOC
)
const Enhanced = enhance(RadiologyForm);
export default Enhanced;