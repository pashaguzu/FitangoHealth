import React from 'react';
import {injectIntl} from 'react-intl';
import {branch, renderComponent, withHandlers, compose} from 'recompose';
import {Modal} from 'antd';


export const modalManager = (WrappedComponent) => {
    class ModalWrappeer extends React.Component {

        onOk = () => {
            //console.log(this.props);
            //const prepareInput = this.props.prepareInput;


            this.props.onSubmit();
            /*this.props.setId(100);
           // this.props.setLoading(true);
            setTimeout(() => {
                this.props.setLoading(false);
            },2000);*/
            //const callback = this.props.onHide;
            //this.props.onSubmit({prepareInput, callback});
        }

        onCancel = () => {
            console.log('onCancel');
            if (this.props.onHide) {
                this.props.onHide();
            }
        }
        render() {
            console.log(this.props);
            //console.log(this.state);
            const {loading=false, type='', intl, form, showNotes=true} = this.props;
            //let {id, details} = this.props;
            const {getFieldDecorator} = form;

            let modalTitle = 'Modal';//type === '' ? 'Select Element' : this.props.getTypeName(type);
            if (this.props.modalTitle) {
                modalTitle = this.props.modalTitle();
            }
            const modalOpts = {};
            if (this.props.modalFooter) {
                modalOpts.footer = this.props.modalFooter();
            }
            if (this.props.modalWidth) {
                modalOpts.width = this.props.modalWidth();
            }
            if (loading) {
                modalOpts.footer = false;
            }
            // Wraps the input component in a container, without mutating it. Good!
            return (
                <Modal
                    title={modalTitle}
                    visible={true}
                    onOk={this.onOk}
                    onCancel={this.onCancel}
                    okText="Save"
                    maskClosable={false}
                    confirmLoading={loading}
                    {...modalOpts}
                >
                    {loading ? 'Loading...' :
                        <React.Fragment>
                            <WrappedComponent {...this.props} />
                        </React.Fragment>
                    }
                </Modal>);
        }
    }

    //treatmentModal.displayName = `treatmentModal(${getDisplayName(WrappedComponent)})`;

    return injectIntl(ModalWrappeer);
}

export const modalManagerHOC = compose(withHandlers({
    // onSubmit: props => ({prepareInput}) => {
    //     console.log(props);
    //     props.form.validateFields((err, values) => {
    //         if (!err) {
    //
    //             const input = prepareInput(values);
    //
    //             // this.setState({
    //             //     loading: true
    //             // });
    //             // save the health item
    //             //return onSubmit(values);
    //         }
    //     });
    // },

}),modalManager);



const Spinner = () =>
    <div className="Spinner">
        <div className="loader">Loading...</div>
    </div>;
const isLoading = ({ loading }) => loading;
export const withSpinnerWhileLoading = branch(
    isLoading,
    renderComponent(modalManager(Spinner))
);