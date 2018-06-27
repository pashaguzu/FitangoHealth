import React from 'react';
import {Form, Input, Icon, Tooltip, Button} from 'antd';
import { compose, withHandlers, withState} from 'recompose';
import messages from './messages';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};
const formTailLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20, offset: 4},
};


const OptionsElementOptionsPure = ({form, options=[], keys=[], add, remove}) => {

    return <React.Fragment>
        {keys.map((k, index) => {
            const block = options[k] || {};
            form.getFieldDecorator(`ids[${k}]`, {initialValue: block.value});
            form.getFieldDecorator(`keys[${index}]`, {initialValue: k});
            return (
                <FormItem
                    {...(index === 0 ? formItemLayout : formTailLayout)}
                    label={index === 0 ? 'Options' : ''}
                    required={true}
                    key={index}
                >
                    {form.getFieldDecorator(`options[${k}]`, {
                        initialValue: block.label || '',
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            message: "Please enter option "+((index+1))+" or delete this line.",
                        }],
                    })(
                        <Input placeholder={"Option "+(index+1)} addonAfter={keys.length > 1 ? (
                            <Tooltip title="Remove Option"><Icon
                                className="dynamic-delete-button"
                                style={{marginLeft:5, color:'red'}}
                                type="minus-circle-o"
                                disabled={keys.length <=1}
                                onClick={() => remove(k)}
                            /></Tooltip>
                        ) : null}/>
                    )}
                </FormItem>
            );
        })}

        <FormItem {...formTailLayout}>
            <Button type="dashed" onClick={add} style={{width: '60%'}}>
                <Icon type="plus"/> Add Option
            </Button>
        </FormItem>
    </React.Fragment>
}


const enhance = compose(
   // injectIntl,
    withState('uuid', 'setUUID', props => props.options.length),
    withState('keys', 'setKeys',  props => {
        return Object.keys(props.options);// save keys
    }),

    withHandlers({
        add: props => event => {
            const keys = props.keys;
            let uuid = props.uuid;
            const nextKeys = keys.concat(uuid);
            uuid++;
            props.setUUID(uuid);
            props.setKeys(nextKeys);
        },
        remove: props => k => {
            const {keys} = props;
            // can use data-binding to get
            //const keys = form.getFieldValue('keys');
            // We need at least one passenger
            if (keys.length <= 2) {
                return;
            }

            // remove option by key
            //options

            props.setKeys(keys.filter(key => key !== k));
            /*// can use data-binding to set
            form.setFieldsValue({
                keys: k,
            });*/
        }
    })
);

export default enhance(OptionsElementOptionsPure);
