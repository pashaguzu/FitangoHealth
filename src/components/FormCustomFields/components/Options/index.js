import React from 'react';
import {withHandlers, withState, defaultProps, compose} from 'recompose';
import {SortableContainer, SortableElement, arrayMove, SortableHandle} from 'react-sortable-hoc';
import {Form, Input, Button, Icon, Checkbox, Tooltip} from 'antd';
import './index.less';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};
const formTailLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20, offset: 4},
};

export const DragHandle = SortableHandle(() => <Tooltip title="Sort"><span className="sorter-handler" style={{verticalAlign:'baseline'}}></span></Tooltip>);

const OptionItem = SortableElement(({form, k, i:index, options=[], keys=[], remove, minOptions}) => {
    const {getFieldDecorator} = form;
    const block = options[k] || {};
    // form.setFieldsValue({
    //     ['aaaaaaaa']: 'aaa'
    // });


    //console.log(form.getFieldsValue(), 'Values');
    //console.log(options);
    const optionError = form.getFieldError(`options[${k}]`);
    //console.log(index);
    return <li style={{position:'relative', marginBottom:5}}>
        {/*<TreatmentBlockManagerModal k={k} form={form} planId={planId} treatmentId={treatmentId} details={block} id={block.id||''} onHide={this.hideBlock} />*/}

        <div style={{marginRight:50}}>
            <FormItem
                help={optionError || ''}
                validateStatus={optionError ? 'error' : ''}
            >
                {/*getFieldDecorator(`keys[${index}]`, {initialValue: k})(<Input />)*/}
                {getFieldDecorator(`options[${k}]`, {
                    initialValue: block.label || '',
                    validateTrigger: ['onChange', 'onBlur'],
                    //trigger: 'onChange',
                    rules: [{
                        required: true,
                        message: "Please enter option "+((index+1))+" or delete this line.",
                    }],
                })(
                    <Input.TextArea placeholder={"Option "+(index+1)} autosize={{ minRows: 1, maxRows: 6 }} style={{ width: '100%', marginRight: 8 }} />
                )}
            </FormItem>
        </div>
        <div style={{position:'absolute', right:0, top:3}}>
        <DragHandle />
        {keys.length > minOptions ? (
            <Tooltip title="Remove Option"><Icon
                className="dynamic-delete-button"
                style={{marginLeft:5,  verticalAlign:'middle'}}
                type="minus-circle-o"
                disabled={keys.length <= minOptions}
                onClick={() => remove(k)}
            /></Tooltip>
        ) : null}
        </div>

    </li>;
});

const OptionsList = SortableContainer(({keys=[], options=[], form, remove,  minOptions}) => {

    form.getFieldDecorator(`ids`, {initialValue: options.map(option => option.value)});
    form.getFieldDecorator(`keys`, {initialValue: keys});
    return (
        <React.Fragment>
        <ul style={{listStyle: 'none',
            marginLeft: 0,
            paddingLeft: 0}}
        >
            {keys.map((k, index) => (
                <OptionItem key={`item-${index}`} index={index} i={index} form={form} k={k} keys={keys} options={options} remove={remove} minOptions={minOptions} />
            ))}
        </ul>

        </React.Fragment>
    );
});

const OptionsPure = (props) => {
    const {required=true} = props;
    //console.log(props);
        return <React.Fragment>
            <FormItem
                //optionsErrors
            {...formItemLayout}
            label={props.title}
            required={required}
            >
                <OptionsList {...props} />
            </FormItem>
            <FormItem {...formTailLayout}>
                <Button type="dashed" onClick={props.add} style={{width: '60%'}}>
                <Icon type="plus"/> Add
                </Button>
            </FormItem>
        </React.Fragment>
            ;
}

const enhance = compose(
    defaultProps({
        minOptions:1,
        useDragHandle:true,
        title:'Options',
        options: []
    }),
    withState('options', 'setOption', props => props.options),
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
            const {keys, form} = props;
            //const keys = form.getFieldValue('keys');
            // We need at least one passenger
            if (keys.length <= props.minOptions) {
                return;
            }
            const keysfiltered = keys.filter(key => key !== k);
            //console.log(keysfiltered);
            props.setKeys(keysfiltered);
            //props.form.setFieldsValue({keys});
            // update keys
            // remove
            //console.log(keysfiltered);
            // form.setFieldsValue({
            //     keys: []
            // });
        }
    }),
    withHandlers({
        onSortEnd : props => ({oldIndex, newIndex}) => {
            //console.log(1111);
            const options = props.form.getFieldValue('options');
            //console.log(arrayMove(options, oldIndex, newIndex));
            const newOptions = arrayMove(options, oldIndex, newIndex);
            props.form.setFieldsValue({
                options: newOptions,
                keys: Object.keys(newOptions)
            })
        }
    })
)

export const Options = enhance(OptionsPure);
export default Options;