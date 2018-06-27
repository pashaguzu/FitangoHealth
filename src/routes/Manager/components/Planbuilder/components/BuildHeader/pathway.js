import React from 'react';
import { Card, Input,Layout,Select,Form, DatePicker, Radio, Button, message } from 'antd';
import { withApollo } from 'react-apollo'
import {injectIntl} from 'react-intl';
import moment from 'moment';
import messages from './messages';
import Scheduling from './components/Scheduling';
import CancerSelect from '../../../../../../components/Autosuggest/containers/CancerSelect';
const { TextArea } = Input;
const FormItem = Form.Item;
const createFormField = Form.createFormField;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        md: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        md: { span: 12 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 14,
            offset: 6,
        },
    },
};


class BuildHeader extends React.Component{

    constructor(props){
        super(props);

        this.state = {displayedFamily: props};
        this.stopLoading = this.stopLoading.bind(this);
    }

    static defaultProps = {
        type: 'ap'
    }

    submitCallback = (plan) => {
        const{ history } = this.props;
        message.success('Updated');

        this.stopLoading();

        let mainUrl = '/pb/'+plan.id+'/build/body';
        history.push(mainUrl);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { onUpdateSubmit, onCreateSubmit, plan } = this.props;
        this.props.form.validateFields((err, values) => {
            //console.log(err);

            //console.log(values);
            //return;
            if (!err) {
                this.setState({loading:true});
                if (plan && plan.id) {
                    return onUpdateSubmit(values, this.submitCallback);/*.then(({data}) => {
                        this.submitCallback(data.planUpdate);
                    });*/
                } else {
                    return onCreateSubmit(values, this.submitCallback);/*(.then(({data}) => {
                        this.submitCallback(data.planCreate);
                    });*/
                }
            }
        });
    }
    stopLoading() {
        this.setState({ loading: false });
    }

    disabledDate = (current) => {
        // Can not select future
        return current && current > moment().endOf('day');

    }


    render(){
        const { intl,form, plan, type } = this.props;
        const { getFieldDecorator } = form;

        return(
            <React.Fragment>

            <Form onSubmit={this.handleSubmit}>
            <Card title="Pathway Basic Information" >

                <FormItem
                    {...formItemLayout}
                    label={intl.formatMessage(messages.title)}
                >
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message:"Input title Please" , whitespace: true }],
                    })(
                       <Input placeholder="Title" />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label={intl.formatMessage(messages.description)}
                >
                    {getFieldDecorator('description')(
                        <TextArea placeholder="Description" autosize={{ minRows: 2}} />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="Cancer"
                >
                    {getFieldDecorator('cancerId',{
                        rules: [{ required: true, message:"Select Cancer" , whitespace: true }],
                        validateTrigger: ['onChange', 'onSelect'],
                    })(
                        <CancerSelect />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label={intl.formatMessage(messages.version)}
                >
                    {getFieldDecorator('version', {
                        rules: [{type:'string', required: true, message:"Input Version Please" }],
                    })(
                        <Input placeholder="Version" />
                    )}
                </FormItem>


                <FormItem
                    {...formItemLayout}
                    label="Release Note"
                >
                    {getFieldDecorator('note', {
                        rules: [{type:'string',  message:"Enter Release Note" }],
                    })(
                        <Input placeholder="Release Note" />
                    )}
                </FormItem>

                <FormItem style={{textAlign:'center'}}>
                    <Button loading={this.state.loading} type="primary" htmlType="submit" className="register-form-button">
                        {intl.formatMessage(messages.continue)}
                    </Button>
                </FormItem>

            </Card>



            </Form>

            </React.Fragment>
        );
    }

}

const BuildHeaderForm = Form.create({
    mapPropsToFields(props) {
        const {plan} = props;
        if (!plan) {
            return;
        }
        const {cancer={}} = plan;
        //console.log('mapPropsToFields', props);
        //console.log(plan.schedule);
        //console.log(typeof plan.schedule.limitStartDow);
        //const {type} =  plan.schedule;
        return {
            title: createFormField({
                value: plan.title,
            }),
            description: createFormField({
                value: plan.description,
            }),
            cancerId: createFormField({
                value: cancer.id || undefined
            }),
            version: createFormField({
                value: plan.version
            }),
        };
    }
})(BuildHeader);
export default withApollo(injectIntl(BuildHeaderForm));
