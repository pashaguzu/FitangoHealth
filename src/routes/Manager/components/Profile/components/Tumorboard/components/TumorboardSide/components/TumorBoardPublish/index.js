import React from 'react';
import {Form,Button, Radio, Input} from 'antd';
import {compose, withState, withHandlers} from 'recompose';
import {PeopleSelect} from "../../../../../../../../../../components/Autosuggest/containers/PeopleSelect";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const formItemLayoutDefault = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

const TumorBoardPublish = props => {
    const {form, formItemLayout=formItemLayoutDefault, tumorboard={}} = props;
    const {getFieldDecorator, getFieldValue} = form;
    const isOpen = getFieldValue('isOpen');
    let {participants=[], isOpen:visibilityOpen} = tumorboard;
    participants = participants.map(participant => {
        return participant.id;
    });
    return <div>
        <Form>
            <FormItem
                {...formItemLayout}
                label="Visibility"
            >
                {getFieldDecorator('isOpen', {
                    initialValue: visibilityOpen,
                    rules: [{
                        required: true,
                        message: "Please Select People you want to invite",
                        //whitespace: true
                    }],
                })(
                    <RadioGroup style={{marginTop:5}}>
                        <Radio style={radioStyle} value={false}>Open</Radio>
                        <Radio style={radioStyle} value={true}>By Invitation</Radio>
                    </RadioGroup>
                )}
            </FormItem>
            {isOpen &&
            <FormItem
                {...formItemLayout}
                label="Invite People"
            >
                {getFieldDecorator('participants', {
                    //initialValue: participants,
                    rules: [{
                        required: true,
                        message: "Please Select People you want to invite",
                        //whitespace: true
                    }],
                })(
                    <PeopleSelect mode="multiple"/>
                )}
            </FormItem>
            }
            {isOpen &&
            <FormItem
                {...formItemLayout}
                label="Message"
            >
                {getFieldDecorator('message', {
                    //initialValue: participants,
                })(
                    <Input.TextArea />
                )}
            </FormItem>
            }
        </Form>
        <div style={{textAlign:'right'}}>
        <Button type="primary" onClick={props.doFinish}>Invite and Finish</Button>
        </div>
    </div>;
}

const enhance = compose(
    Form.create(),
    withHandlers({
        doFinish: props => () => {
            console.log(props, 'Props before input');
            props.form.validateFields((err, values) => {
                //console.log(err);
                //console.log(values);
                if (!err) {
                    let input = values;
                    //const {participants} = values;

                    props.onSubmit(props.tumorboard.id, {...input}).then(({data})=> {
                        // set
                        props.setStep(3);
                        //props.onHide();
                    });
                }
            });
        }
    }),
);


export default enhance(TumorBoardPublish);