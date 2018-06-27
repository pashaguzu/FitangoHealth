import React from 'react';
import {Form, Input, Button, Icon, Checkbox, Tooltip} from 'antd';
import {injectIntl} from 'react-intl';
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



export const prepareInput = (values) => {
    const {title, schedule, keys=[], ids=[]} = values;
    let {blocks=[], options:blockOptions=[]} = values;
    blocks = keys.map(i => {
        const id =  ids[i] || '';// ? timesPerHour[i]['id'] : '';
        const block = blocks[i] || '';
        const options = blockOptions[i] || [];
        return {id, 'title': block}
    });

    return {
        schedule:schedule,
        treatmentElement: {
            title:title,
            blocks,
        }
    }
}


let uuid = 0;

class OptionsElementFormFields extends React.Component {

    constructor(props) {
        super(props);
        const {form, details} = this.props;
        const {blocks = [{id:'', title:''}]} = details;

        const keys = blocks.length > 0 ?  Object.keys(blocks) : [0];
        uuid = blocks.length;
        //console.log(options);
        form.getFieldDecorator('keys', {initialValue: keys});
        blocks.map((option, i) => {
            //form.getFieldDecorator(`options[${i}]`, {initialValue: option.label});
            form.getFieldDecorator(`ids[${i}]`, {initialValue: option.id});
            return false;//option.value;
        });

        this.state = {
            openOptionFlow:false,
            openAddBlock: false
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

    addBlock = () => {
        this.setState({openAddBlock: true});
    }

    hideBlock = () => {
        this.setState({openAddBlock: false});
    }

    render() {
        console.log(this.props);
        const {id="", form, intl, details, planId} = this.props;
        const {getFieldDecorator, getFieldValue} = form;
        const {id:treatmentId,title, blocks=[]} = details;
        //getFieldDecorator('keys');
        const keys = getFieldValue('keys');
        //const blocks = getFieldValue('blocks');
        //const options = getFieldValue('options');
        const optionsFields = keys.map((k, index) => {
            const block = blocks[k] || {};
            return (
                <FormItem
                    {...(index === 0 ? formItemLayout : formTailLayout)}
                    label={index === 0 ? 'Blocks' : ''}
                    required={true}
                    key={k}
                >
                            {/*<TreatmentBlockManagerModal k={k} form={form} planId={planId} treatmentId={treatmentId} details={block} id={block.id||''} onHide={this.hideBlock} />*/}
                            {getFieldDecorator(`blocks[${k}]`, {
                                initialValue: block.title || '',
                                validateTrigger: ['onChange', 'onBlur']
                            })(
                                <Input placeholder="Block title" addonAfter={keys.length > 1 ? (
                                    <Tooltip title="Remove Block"><Icon
                                        className="dynamic-delete-button"
                                        style={{marginLeft:5, color:'red'}}
                                        type="minus-circle-o"
                                        disabled={keys.length === 1}
                                        onClick={() => this.remove(k)}
                                    /></Tooltip>
                                ) : null}/>
                            )}
                </FormItem>
            );
        });
        return (

            <React.Fragment>
                <FormItem
                    {...formItemLayout}
                    label={intl.formatMessage(messages.title)}
                >
                    {getFieldDecorator('title', {
                            initialValue: title,
                            rules: [{required: true, message: "Enter Title", whitespace: true}],
                        }
                    )(
                        <Input/>
                    )}
                </FormItem>
                {optionsFields}

                <FormItem {...formTailLayout}>
                    <Button type="dashed" onClick={this.add} style={{width: '60%'}}>
                        <Icon type="plus"/> Add Block
                    </Button>
                    <Button type="primary" onClick={this.props.next} style={{width: '60%'}}>
                          Next
                    </Button>
                </FormItem>

            </React.Fragment>
        );
    }
}

export default injectIntl(OptionsElementFormFields);