import React from 'react';
import {Modal, Spin, Icon, Card, Button } from 'antd';
import {compose, branch, renderComponent} from  'recompose';
import './index.less';

const formItemLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const formTailLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19, offset: 5},
};

export const withModal = (WrappedComponent) => {

    class ModalWrappeer extends React.Component {

        static defaultProps = {
            modalTitle: 'View',
            modalVisible:true,
            modalFooter:null,
            //destroyOnClose:true,
        }

        onOk = () => {
            this.props.onSubmit();
        }

        onCancel = (e) => {
            e.stopPropagation();
            if (this.props.onHide) {
                this.props.onHide(e);
            } else if (this.props.onCancel) {
                this.props.onCancel(e);
            } else {
                this.props.setModalVisible(false);
            }
        }
        render() {
            console.log(this.props);
            //console.log(this.state);
            const {loading=false, modalVisible=true, destroyOnClose=true} = this.props;
            let modalTitle = this.props.modalTitle;//type === '' ? 'Select Element' : this.props.getTypeName(type);
            // if (this.props.modalTitle) {
            //     modalTitle = ;
            // }
            //console.log(modalVisible);
            //console.log(typeof this.props.modalFooter);
            const modalOpts = {};
             if (this.props.modalFooter !== null) {
                 if (this.props.modalFooter === 'close') {
                     modalOpts.footer = <Button type="primary" onClick={this.onCancel}>Close</Button>;
                 } else if (this.props.modalFooter === false) {
                     modalOpts.footer = null
                 } else {
                     modalOpts.footer = this.props.modalFooter;
                 }
             }
             //console.log(modalOpts);
            if (this.props.modalWidth) {
                modalOpts.width = this.props.modalWidth;
            }
            if (loading) {
                modalOpts.footer = <div style={{clear:'both', height:32}}><div style={{float:'right',backgroundColor:'#cfd8dc9e', width:'30%', height:32}}></div></div>;
                modalOpts.closable = false;
                modalOpts.title = <div style={{backgroundColor:'#cfd8dc9e', width:'50%', height:22}}></div>;
            }
            // Wraps the input component in a container, without mutating it. Good!
            return (
                <Modal
                    title={modalTitle}
                    visible={modalVisible}
                    onOk={this.onOk}
                    onCancel={this.onCancel}
                    okText="Save"
                    maskClosable={false}
                    confirmLoading={loading}
                    {...modalOpts}
                >
                    {loading ?
                        <Card bordered={false} loading />
                        :
                        <React.Fragment>
                            <WrappedComponent {...this.props} formItemLayout={formItemLayout} formTailLayout={formTailLayout} />
                        </React.Fragment>
                    }
                </Modal>);
        }
    }

    //treatmentModal.displayName = `treatmentModal(${getDisplayName(WrappedComponent)})`;



    return (ModalWrappeer);
}

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export const Spinner = () =>
    //<Modal visible={true} footer={false} closable={false} width={50}>
    <center style={{lineHeight:'10em'}}><Spin indicator={antIcon} /></center>
    //</Modal>;

const isLoading = ({ loading=false }) => loading;
export const withSpinnerWhileLoading = branch(
    isLoading,
    renderComponent(Spinner)
);
// const enhance = compose(
//     withSpinnerWhileLoading
// );


export const ModalBodyFooter = props => {
    return <div className="ant-modal-body-footer">{props.children}</div>
}





