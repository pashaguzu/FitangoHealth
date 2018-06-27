import React from 'react';
import {DateField} from "../../../../../../../../../../components/FormCustomFields/index";
import {injectIntl} from 'react-intl';
import messages from './messages';
import {compose, branch, renderComponent, withProps, withState} from 'recompose';
import {Modal, message, Form, Input, Divider, Switch} from 'antd';
import moment from 'moment';
import {withModal} from "../../../../../../../../../../components/Modal/index";

const formItemLayoutDefault = {
    labelCol: {span: 5},
    wrapperCol: {span: 19},
};
const formTailLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 20, offset: 4},
};
const { TextArea } = Input;
const FormItem = Form.Item;


const enhance = compose(

    withProps(props => {

        let modalTitle = 'Modal2';//type === '' ? 'Select Element' : this.props.getTypeName(type);
        if (props.modalTitle) {
            modalTitle = props.modalTitle();
        }
        const modalOpts = {modalTitle:modalTitle};
        if (props.modalFooter) {
            modalOpts.footer = props.modalFooter();
        }
        if (props.modalWidth) {
            modalOpts.width = props.modalWidth();
        }
        return {
            ...modalOpts
        }
    }),
    withState('modalVisible', 'setModalVisible', true),
    withModal
);

export const modalHOCPure = (WrappedComponent) => {
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
            } else {
                this.props.setModalVisible(false);
            }
        }
        render() {
            console.log(this.props);
            //console.log(this.state);
            const {modalVisible=true,loading=false, type='', intl, form, showNotes=true, useTimeline=true, formItemLayout=formItemLayoutDefault, pathway={}} = this.props;
            //let {id, details} = this.props;
            const {getFieldDecorator} = form;



            // Wraps the input component in a container, without mutating it. Good!
            // add source info

            //
            //
            return (

                        <React.Fragment>
                            <WrappedComponent {...this.props} />

                            {useTimeline && <React.Fragment>

                                <Divider>Timeline Data</Divider>

                                <FormItem
                                    {...formItemLayout}
                                    label={intl.formatMessage(messages.date)}
                                >
                                    {getFieldDecorator('timeline[date]', {
                                            initialValue: moment(),
                                            rules: [{required: true, message: "Select date"}],
                                        }
                                    )(
                                        <DateField/>
                                    )}
                                </FormItem>

                                {showNotes && <FormItem
                                    {...formItemLayout}
                                    label={intl.formatMessage(messages.notes)}
                                >
                                    {getFieldDecorator('timeline[notes]', {
                                            rules: [{message: "Enter Notes", whitespace: true}],
                                        }
                                    )(
                                        <TextArea autosize={{minRows: 2}}/>
                                    )}
                                </FormItem>}

                                <FormItem
                                    {...formItemLayout}
                                    label={intl.formatMessage(messages.important)}
                                >
                                    {getFieldDecorator('timeline[isCritical]'
                                    )(
                                        <Switch checkedChildren="Yes" unCheckedChildren="No"></Switch>
                                    )}
                                </FormItem>
                            </React.Fragment>
                            }

                        </React.Fragment>
                  );
        }
    }

    //treatmentModal.displayName = `treatmentModal(${getDisplayName(WrappedComponent)})`;

    return ModalWrappeer;
}

export const modalHOC = compose(injectIntl, enhance, modalHOCPure);


const Spinner = () =>
    <div className="Spinner">
        <div className="loader">Loading... as spinner</div>
    </div>;
const isLoading = ({ loading }) => loading;
export const withSpinnerWhileLoading = branch(
    isLoading,
    renderComponent(modalHOC(Spinner))
);