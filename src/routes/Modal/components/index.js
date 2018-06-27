import {compose, branch, renderComponent} from 'recompose';
/**
 * Created by Pavel on 21.12.2017.
 */
import React from 'react';
import {
    FormattedMessage,

} from 'react-intl';


import {Modal, Form,Button} from 'antd';


class ModalForm extends React.Component {
    state = {
        visible: false,
    };

    handleCancel = () => {
        this.setState({ visible: false });
    }
    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     const { onSubmit } = this.props;
    //     this.props.form.validateFields((err, values) => {
    //         if (!err) {
    //             this.setState({
    //                 loading: true
    //             });
    //             return onSubmit(values);
    //         }
    //     });
    // }
    //
    // handleClick = (e) => {
    //     e.preventDefault();
    //
    //     const { onClick } = this.props;
    //     this.props.form.validateFields((err, values) => {
    //         if (!err) {
    //             return onClick(values);
    //         }
    //     });
    // }



    render() {


        return (
            <Modal
                visible={true}
                title={<FormattedMessage id="default" defaultMessage="Inactivity" description="Inactivity" />}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                    <Button key="submit" type="primary" onClick={this.handleClick}>
                        <FormattedMessage id="user.login.forgot.send" defaultMessage="Send" description="Send" />
                    </Button>,
                ]}
            >
                <FormattedMessage id="default2" defaultMessage="You were inactive for 5 minutes" description="You were inactive for 5 minutes" />
            </Modal>

        );
    }
}

const WrappedModalForm = Form.create()(ModalForm);
export default WrappedModalForm;





export const Spinner = () =>
    <div className="Spinner">
        <div className="loader">Loading...</div>
    </div>;
const isLoading = ({ loading }) => loading;

export const withSpinnerWhileLoading = branch(
    isLoading,
    renderComponent(Spinner)
);