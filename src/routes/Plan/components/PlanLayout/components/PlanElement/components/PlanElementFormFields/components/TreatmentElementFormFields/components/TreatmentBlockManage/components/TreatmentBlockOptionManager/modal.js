import React from 'react';
import {Modal} from 'antd';

export const modalHOC = (WrappedComponent) => {
    class ModalWrappeer extends React.Component {

        onOk = () => {
            const prepareInput = this.props.prepareInput;
            const callback = this.props.onHide;
            this.props.onSubmit({prepareInput, callback});
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