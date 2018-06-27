import { compose, withHandlers , withProps} from 'recompose';
import {RadiationForm, prepareRadiationInput} from "../../../../../../../../../../Health/components/Forms/components/Radiation/index";
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
            return prepareRadiationInput(values);
        }
    }),
    modalHOC
)
const Enhanced = enhance(RadiationForm);
export default Enhanced;