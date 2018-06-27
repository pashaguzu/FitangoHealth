import {compose, withHandlers, withState} from 'recompose';
import TimelineElementEdit from '../components/TimelineElementEdit';


const enhance = compose(
    withState('edit','setOpenEdit', false),
    withHandlers({
        closeEdit: props => () => {
            props.setOpenEdit(false);
        },
        openEdit: props => () => {
            props.setOpenEdit(true);
        }
    })
)

export default enhance(TimelineElementEdit);
