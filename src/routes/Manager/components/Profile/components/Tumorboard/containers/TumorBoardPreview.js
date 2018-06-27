import {TumorBoardPreview} from '../components/TumorBoardPreview';
import {compose, withHandlers, withProps} from 'recompose';
import {withModal} from "../../../../../../../components/Modal/index";
import {Form} from 'antd';

const enhance = compose(
    Form.create(),
    withHandlers({
        onSubmit: props => () => {
            const notes = props.form.getFieldValue('notes');
            props.onSave(notes);
        }
    }),
    withModal
);

export default enhance(TumorBoardPreview);