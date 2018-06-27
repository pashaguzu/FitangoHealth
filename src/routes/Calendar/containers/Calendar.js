import Calendar from '../components/Calendar';
import { compose, withProps, mapProps, withHandlers , defaultProps, withState} from 'recompose';


const enhance = compose(
    withState('showAdd', 'setShowAdd', false),
    withHandlers({
        toggleAdd: props => () => {
            props.setShowAdd(!props.showAdd);
        }
    })
);

export default enhance(Calendar);