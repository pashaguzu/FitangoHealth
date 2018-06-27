import React from 'react';
import { Card, Input,Layout,Select,Form, DatePicker, Radio, Button, message } from 'antd';
import { withApollo } from 'react-apollo'
import {injectIntl} from 'react-intl';
import moment from 'moment';
import messages from './messages';
import Scheduling from './components/Scheduling';
const { TextArea } = Input;
const FormItem = Form.Item;
const {Header, Content} = Layout;
const createFormField = Form.createFormField;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
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
        const { getFieldDecorator, setFieldsValue } = form;
        console.log(this.props);

        const needScheduling = type === 'ap';

        return(
            <React.Fragment>

            <Form onSubmit={this.handleSubmit}>
            <Card title={intl.formatMessage(messages.pageTitle)}>

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




            </Card>

                {needScheduling && <Scheduling form={form} formItemLayout={formItemLayout} tailFormItemLayout={tailFormItemLayout} />}


                <FormItem style={{textAlign:'center', 'marginTop':24}}>
                    <Button loading={this.state.loading} type="primary" htmlType="submit" className="register-form-button">
                        {intl.formatMessage(messages.continue)}
                    </Button>
                </FormItem>
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
            // schedule
            'schedule[type]': createFormField({
                value: plan.schedule.type,
            }),
            'schedule[limitStartDow]': createFormField({
                value: plan.schedule.limitStartDow,
            }),
            'schedule[limitDow]': createFormField({
                value: !!plan.schedule.limitStartDow,
            }),
            'schedule[dows]': createFormField({
                value: plan.schedule.dows,
            }),
            'schedule[relativeEndDay]': createFormField({
                value: plan.schedule.relativeEndDay,
            }),

            'schedule[startDate]': createFormField({
                value: plan.schedule.startDate ? moment(plan.schedule.startDate) : moment(),
            }),
            'schedule[endDate]': createFormField({
                value: plan.schedule.endDate ? moment(plan.schedule.endDate) : undefined,
            }),
        };
    }
})(BuildHeader);
export default withApollo(injectIntl(BuildHeaderForm));
