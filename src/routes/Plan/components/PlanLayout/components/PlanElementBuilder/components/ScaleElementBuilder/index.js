import React from 'react';
import {Form, Select, Input, Icon, Tooltip, Button} from 'antd';
import { compose, withHandlers, withState, withProps, branch} from 'recompose';
import messages from './messages';
import {injectIntl} from 'react-intl';

const Option = Select.Option;
const FormItem = Form.Item;

const formItemLayoutDefault = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};
const formTailLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20, offset: 4},
};


const ScaleElementOptionsPure = (props) => {
    const {form, options=[], keys=[], add, remove} = props;

    //console.log(props);
    return <React.Fragment>
        {keys.map((k, index) => {
            const block = options[k] || {};
            form.getFieldDecorator(`ids[${k}]`, {initialValue: block.value});
            form.getFieldDecorator(`keys[${index}]`, {initialValue: k});
            return (
                <FormItem
                    {...(index === 0 ? formItemLayoutDefault : formTailLayout)}
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
                        <Input placeholder={"Option "+(index+1)} addonAfter={keys.length > 2 ? (
                            <Tooltip title="Remove Option"><Icon
                                className="dynamic-delete-button"
                                style={{marginLeft:5, color:'red'}}
                                type="minus-circle-o"
                                disabled={keys.length <=2}
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

    withHandlers({
        add: props => event => {
            console.log(props);
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




const ScaleElementOptions = enhance(ScaleElementOptionsPure);


const ScaleElementBuilder = (props) => {
    const {form, loading, intl, scales=[], formItemLayout=formItemLayoutDefault, details={}, updateOptions, options=[], keys=[], uuid=0 /*options=[]*/} = props;
    const {getFieldDecorator} = form;
    const {scaleId='', label=''/*, options:options = []*/} = details;

    //console.log(form.getFieldValue('options'));
    //console.log(keys);//
    //const options = form.getFieldValue('options') || optionsInit;
    console.log(props);
    return (
        <React.Fragment>
            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.title)}
            >
                {getFieldDecorator('title', {
                        initialValue:label,
                        rules: [{required: true, message: "Enter Title", whitespace: true}],
                    }
                )(
                    <Input/>
                )}
            </FormItem>

            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.scale)}
            >
                {getFieldDecorator('scaleId', {
                        initialValue: scaleId,
                        rules: [{required: true, message: "Select Scale", whitespace: true}],
                    }
                )(
                    <Select onSelect={updateOptions} style={{width:'100%'}}>
                        {scales.map(scale => <Option key={scale.id} value={scale.id}>{scale.name}</Option>)}
                    </Select>
                )}
            </FormItem>

            <ScaleElementOptions options={options} setUUID={props.setUUID} setKeys={props.setKeys} keys={keys} uuid={uuid} form={form} />
        </React.Fragment>
    );
};



const enhaceWithState = compose(
    withState('options', 'setOptions', props=>props.options),
    withState('uuid', 'setUUID', props => props.uuid),
    withState('keys', 'setKeys', props=> props.keys),
);

const enhanceScale = compose(
    withProps(props => {
        const {details={}} = props;
        const{options=[]} = details;
        //console.log(options);
        return {
            options,
            keys: Object.keys(options),
            uuid: options.length
        }
    }),
    branch(props=> !props.data.loading, enhaceWithState),

    withHandlers({
        updateOptions: props => (value) => {
            const {scales, form} =props;
            const selectedScale = scales.filter(scale => {
                return scale.id === value;
            });
            //console.log(scales);
            //console.log(selectedScale);
            if (selectedScale.length > 0) {
                const {options=[]} = selectedScale[0];
                //console.log(props);
               // props.setKeys(Object.keys(options));
               // props.setUUID(options.length);
                 /*form.setFieldsValue({
                     options: options,
                 });*/
                 props.setOptions(options.map(option => {
                     return {value:'', label:option};
                 }));
                props.setKeys(Object.keys(options));
                props.setUUID(options.length);
            }
        }
    })
)


export default enhanceScale(ScaleElementBuilder);


export const prepareInput = (values) => {
    const {scaleId, title, ids} = values;
    //console.log(values);
    let {options} = values;
    options = options.map((option, i) => {
        const id = ids[i] || '';//timesPerHour[i] ? timesPerHour[i]['id'] : '';
        return {id, 'label': option}
    });
    return {
        scaleElement: {
            title:title,
            scaleId:scaleId,
            options:options
        }
    }
}
