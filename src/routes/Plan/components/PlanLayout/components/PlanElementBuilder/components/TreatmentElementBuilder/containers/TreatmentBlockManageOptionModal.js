import React from 'react';
import { compose, branch, renderComponent, withHandlers , defaultProps, withState} from 'recompose';
import {Modal, Form, message} from 'antd';
import TreatmentBlockManageOptionSelect, {getProperElements} from '../components/TreatmentBlockOptionSelect';
import TreatmentBlockOptionElementEditor from '../components/TreatmentBlockOptionManager';
import {withAddMutation, withEditMutation, withQuery} from './mutations.js';




const enhance = compose(
    Form.create(),
    withHandlers({
        // submit the element
        onSubmit: props => ({prepareInput, callback}) => {
            console.log(props, 'onSubmit');
            const {id, type, isEdit=false} = props;


            props.form.validateFields((err, values) => {

                if (!err) {
                    let input = prepareInput(values);
                    console.log(values);
                    const {notes = ''} = values;

                    input = {...input, notes};


                    if (props.updateElement) {
                        console.log(input);
                        props.updateElement({input}).then(({data}) => {
                            props.onHide();
                            //console.log('update',data);
                            // props.onElementAdd(data.updateTreatmentBlockElement);
                            /*if (callback) {
                                callback(data.updateTreatmentBlockElement);
                            }*/
                        });
                    // } else if (props.addElement) {
                    //     // add element
                    //     console.log(input);
                    //     props.addElement({input}).then(({data}) => {
                    //         props.onHide();
                    //     });
                    } else {
                        if (props.onElementUpdate) {
                            // if we are editing tmp item, then just replace with the info
                            props.onElementUpdate(props.i, {id: '', type, ...input}, props.onHide);
                        } else if (props.onElementAdd) {
                            const newElement = {id: '', type, ...input}
                            props.onElementAdd(newElement);
                        } else {
                            //error
                            message.warning('No action for option');
                        }
                    }
                }

            });
        },
    })
);


const TreatmentBlockManageOptionModal = enhance((TreatmentBlockOptionElementEditor));


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

            const modalTitle = type === '' ? 'Select Treatment Type' : this.props.getTypeName(type);

            // Wraps the input component in a container, without mutating it. Good!
            return (
                <Modal
                    title={modalTitle}
                    visible={true}
                    onOk={this.onOk}
                    onCancel={this.onCancel}
                    width={830}
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