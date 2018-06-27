import React from 'react';
import { compose, branch, renderComponent, withHandlers , withProps, withState} from 'recompose';
import {Modal, Form} from 'antd';
import TreatmentBlockManageOptionSelect, {getProperElements} from '../components/TreatmentBlockOptionSelect';
import TreatmentBlockOptionElementEditor from '../components/TreatmentBlockOptionManager';
import {withAddMutation, withEditMutation, withQuery} from './mutations.js';




const enhance = compose(

    withHandlers({
        // submit the element
        onSubmit: props => ({prepareInput, callback}) => {
            //console.log(props);
            const {type} = props;
            props.form.validateFields((err, values) => {

                const input = prepareInput(values);
                //console.log(props.form.isFieldsTouched());
                if (props.addElement) {
                    props.addElement({input, type}).then(({data}) => {
                        //console.log('add',data);
                        //props.onElementAdd(data.addTreatmentBlockElement);
                        if (callback) {
                            callback(data.addTreatmentBlockElement);
                        }
                    });
                } else if (props.updateElement) {
                    props.updateElement({input}).then(({data}) => {
                        //console.log('update',data);
                       // props.onElementAdd(data.updateTreatmentBlockElement);
                        if (callback) {
                            callback(data.updateTreatmentBlockElement);
                        }
                    });
                }
            });
        },

    })
);


const TreatmentBlockManageOptionModal = Form.create()(enhance((TreatmentBlockOptionElementEditor)));


const showSelectOptionModal = (showSelect) =>
    branch(
        showSelect,
        renderComponent(modalHOC(TreatmentBlockManageOptionSelect)),
    );
// add graphql HOC
const enhanceModal = compose(
    // toggle type of the element
    withState('type', 'setType', ({type=''}) => type),
    branch(props => props.id && props.id !== '', withEditMutation, withAddMutation),
    branch(props => props.id && props.id !== '', withQuery),
    withHandlers({
        getTypeName: props => type => {
            const elementsByType = getProperElements();
            let title = '';
            elementsByType.forEach(info => {
                const elements = info[1];
                elements.forEach(({type:elType, label}) => {
                    if (elType === type) {
                        title = label;
                        return false;
                    }
                })
            })
            return title;
        }
    }),
    showSelectOptionModal(
        props => {
            console.log(props, 'showSelectOptionModal');
            return !(props.type && props.type !== '');
        }
    ),
);
const TreatmentBlockManageOptionModalWithMutation = enhanceModal(TreatmentBlockManageOptionModal)

export default TreatmentBlockManageOptionModalWithMutation;






function modalHOC(WrappedComponent, mode='add') {
    class ModalWrappeer extends React.Component {

        onOk = () => {
            this.props.onSubmit();
        }

        onCancel = () => {
            if (this.props.onHide) {
                this.props.onHide();
            }
        }
        render() {
            console.log(this.props);
            //console.log(this.state);
            const {loading=false, type=''} = this.props;
            //let {id, details} = this.props;

            const modalTitle = type === '' ? 'Select Element' : this.props.getTypeName(type);

            // Wraps the input component in a container, without mutating it. Good!
            return (
                <Modal
                    title={modalTitle}
                    visible={true}
                    onOk={this.onOk}
                    onCancel={this.onCancel}
                >
                    {loading ? 'Loading...' :
                        <WrappedComponent {...this.props} />
                    }
                </Modal>);
        }
    }

    //treatmentModal.displayName = `treatmentModal(${getDisplayName(WrappedComponent)})`;

    return ModalWrappeer;
}