import DiagnosisManager, {prepareInput} from '../components/DiagnosisManager';
import {compose, withHandlers, branch, renderComponent} from 'recompose';
import {Form} from 'antd';
import {modalManagerHOC} from '../../modalManager';
import {withMutation} from '../mutations';
import withQuery from '../queries';

// add mutations and queries

const enhance = compose(
    Form.create(),
    withQuery,
    withMutation,
    withHandlers({
        onSubmit: props => () => {
            props.form.validateFields((err, values) => {
                if (!err) {

                    const input = prepareInput(values);

                    if (props.addHealthRecord) {
                        props.addHealthRecord(input).then(({data}) => {
                            console.log(data, 'Added');
                            props.onHide();
                        })
                    } else if (props.updateHealthRecord) {
                        props.updateHealthRecord(input).then(({data}) => {
                            console.log(data, 'Updated');
                            props.onHide();
                        })
                    }
                    // this.setState({
                    //     loading: true
                    // });
                    // save the health item
                    //return onSubmit(values);
                }
            });
        },
        modalTitle: props => () => {
            return 'Manage Diagnosis';
        },
        modalWidth: props => () => {
            return 800;
        }
    }),
    modalManagerHOC
);
export default enhance(DiagnosisManager);