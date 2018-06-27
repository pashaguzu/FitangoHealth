import React from 'react';
import {message, Form, Input, Button, Icon, Checkbox, Tooltip} from 'antd';
import {injectIntl} from 'react-intl';
import messages from './messages';
import OptionsElementChildren from './containers/OptionsElementChildren';


const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};
const formTailLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20, offset: 4},
};



export const prepareInput = (values) => {
    const {title, isDropdown, isMultiple, isVertical, hasLines, schedule} = values;
    let {keys,options, ids} = values;
    console.log(values);
    console.log(options);
    options = keys.map(i => {
        const id =  ids[i] || '';// ? timesPerHour[i]['id'] : '';
        const option = options[i] || '';
        return {id, 'label': option}
    });

    return {
        schedule:schedule,
        optionsElement: {
            title:title,
            isDropdown:isDropdown,
            isMultiple:isMultiple,
            hasLines,
            isVertical:isVertical,
            options:options
        }
    }
}


let uuid = 0;

class OptionsElementFormFields extends React.Component {

    constructor(props) {
        super(props);
        const {form, details} = this.props;
        const {options = [{value:'', label:''}]} = details;

        const keys = options.length > 0 ?  Object.keys(options) : [0];
        uuid = options.length;
        //console.log(options);
        form.getFieldDecorator('keys', {initialValue: keys});
        options.map((option, i) => {
            //form.getFieldDecorator(`options[${i}]`, {initialValue: option.label});
            form.getFieldDecorator(`ids[${i}]`, {initialValue: option.value});
            return false;//option.value;
        });

        this.state = {
            openOptionFlow:false,
        }
        //form.getFieldDecorator('options[0]', {initialValue:['']});
        //form.getFieldDecorator('ids[0]', {initialValue:['']});

    }

    static defaultProps = {
        details:{}
    }

    remove = (k) => {
        const {form} = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    };

    add = () => {
        const {form} = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        uuid++;
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    };

    /**
     * Add flow to the option
     * @param k
     */
    addOptionsFlow = () => {

        const {handleSave} = this.props;
        console.log(this.props);

        this.handleSave();
        //handleSave(this.handleSave);
        // get ID of the element
        //const {id='', options={}} = this.props.details;
        //const {id=''} = options[k] || {};
        //if (id === '') {
            // if we don't have ID - we need to save the form first, and then continue
        //}
    }

    handleSave = () => {
        this.setState({openOptionFlow: true});
    }

    hideOptionFlow = () => {
        this.setState({openOptionFlow: false});
    }

    render() {
        console.log(this.props);
        const {id="", form, intl, details, planId} = this.props;
        const {getFieldDecorator, getFieldValue} = form;
        const {label, options=[], isDropdown=false, isMultiple=false, isVertical=false, hasLine=false} = details;
        //getFieldDecorator('keys');
        const keys = getFieldValue('keys');
        //const options = getFieldValue('options');
        const optionsFields = keys.map((k, index) => {
            const option = options[k] || {};
            return (
                <FormItem
                    {...(index === 0 ? formItemLayout : formTailLayout)}
                    label={index === 0 ? 'Options' : ''}
                    required={true}
                    key={k}
                >
                    {getFieldDecorator(`options[${k}]`, {
                        initialValue: option.label || '',
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: "Please input option title or delete this field.",
                        }],
                    })(
                        <Input placeholder="Option title" style={{width: '60%', marginRight: 8}}/>
                    )}

                    {keys.length > 1 ? (
                        <Tooltip title="Remove Option"><Icon
                            className="dynamic-delete-button"
                            style={{marginLeft:5, color:'red'}}
                            type="minus-circle-o"
                            disabled={keys.length === 1}
                            onClick={() => this.remove(k)}
                        /></Tooltip>
                    ) : null}
                </FormItem>
            );
        });
        return (

            <React.Fragment>
                {this.state.openOptionFlow && <OptionsElementChildren onHide={this.hideOptionFlow} id={id} planId={planId} options={options} />}
                <FormItem
                    {...formItemLayout}
                    label={intl.formatMessage(messages.title)}
                >
                    {getFieldDecorator('title', {
                            initialValue: label,
                            rules: [{required: true, message: "Enter Title", whitespace: true}],
                        }
                    )(
                        <Input/>
                    )}
                </FormItem>
                {optionsFields}
                <FormItem {...formTailLayout}>
                    <Button type="dashed" onClick={this.add} style={{width: '60%'}}>
                        <Icon type="plus"/> Add Option
                    </Button>
                </FormItem>


                <Tooltip title="Add Options flow"><Icon type="right-circle-o" onClick={this.addOptionsFlow} /></Tooltip>

            </React.Fragment>
        );
    }
}

export default injectIntl(OptionsElementFormFields);

