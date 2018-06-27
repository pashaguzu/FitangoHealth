import AdditionalInfoModal from '../components/AdditionalInfoModal';
import {withModal} from "../../../../../../../../../../../components/Modal/index";
import {compose, withProps, withHandlers} from 'recompose';

const enhance = compose(
    withProps(props => {
        return {
            modalTitle:'Additional Info'
        }
    }),
    withHandlers({
       onSubmit: props => () => {
            props.onHide();
       }
    }),
    withModal
)

export default enhance(AdditionalInfoModal);