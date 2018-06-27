import AdditionalInfoPure from '../components/AdditionalInfo';
import {compose, withHandlers, withState} from 'recompose';

const enhance = compose(
    withState('viewModal', 'setOpenModal', false),
    withHandlers({
        toggleModal: props => () => {
            props.setOpenModal(!props.viewModal);
        }
    })
);

 const AdditionalInfo = enhance(AdditionalInfoPure);
export default AdditionalInfo;