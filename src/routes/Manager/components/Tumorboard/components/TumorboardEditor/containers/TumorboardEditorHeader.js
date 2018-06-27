import TumorboardEditorHeader from '../components/TumorboardEditorHeader';
import {withTumorboardMutation} from "../../../mutations";
import {branch, renderComponent, compose, withHandlers, withProps} from 'recompose';
import {Form} from 'antd';

export const enhance = compose(
    Form.create(),
    withTumorboardMutation,
    withHandlers({
        goNext: props => () => {
            //props.goNext();
            props.form.validateFields((err, values) => {
                //console.log(err);
                //console.log(values);
                if (!err) {

                    if (props.onAdd) {
                        // if we create
                        props.onAdd(values).then(({data})=> {
                            console.log(data);
                            const {tumorboardCreate} = data;
                            props.setTumorboard(tumorboardCreate);
                            props.goNext();
                        });
                    } else if (props.onUpdate) {
                        // if we create
                        props.onUpdate(values).then(({data})=> {
                            //console.log(data);
                            //const {tumorboardUpdate} = data;
                            //props.setTumorboard(tumorboardUpdate);
                            props.goNext();
                        });
                    }

                }
            });
        },
    }),
);

export default enhance(TumorboardEditorHeader);