import React from 'react';
import PropTypes from 'prop-types';
import { Cascader, Form} from 'antd';
import {injectIntl} from 'react-intl';

const FormItem = Form.Item;

const options = [];
let targetChildren = [];
for (let i = 1; i <= 7; i++) {
    targetChildren.push({
        label: 'Day '+i,
        value: i
    });
}
for (let i = 1; i <= 53; i++) {
    options.push({
        value: i,
        label: 'Week '+i,
        isLeaf: false,
        children: targetChildren
    });
}

export class RelativeDay extends React.Component{
    state = {
        options,
    };


    static propTypes = {
        label: PropTypes.string,
        fieldName: PropTypes.string,
    }

    static defaultProps = {
        label: 'ActionPlan Ends on',
        fieldName: 'schedule[relativeEndDay]',
        postHtml:''
    }

    onChange = (value, selectedOptions) => {
        //console.log(value, selectedOptions);
        //console.log(this.props.fieldName);
        //const {fieldName} = this.props;
        //this.props.form.setFieldsValue({[fieldName]: value});
    }

    componentWillReceiveProps(nextProps) {
        //const { intl, form, formItemLayout, fieldName } = nextProps;
        //const { getFieldDecorator, getFieldValue } = form;
        //const relativeEndDay = getFieldValue(fieldName);
        //console.log(relativeEndDay);

    }

    render(){

        const { intl, form, formItemLayout, label, fieldName, postHtml } = this.props;
        const { getFieldDecorator, getFieldValue } = form;
        //const relativeEndDay = getFieldValue(fieldName);
        //console.log(relativeEndDay);

        return(
            <FormItem
                label={label}
                {...formItemLayout}
            >
                {getFieldDecorator(fieldName, {
                    //initialValue:[1,2],
                    rules: [{
                        type: 'array', required: true, message: 'Please Select',
                    }],
                })(
                        <Cascader style={{width:'60%'}}
                            options={this.state.options}
                            onChange={this.onChange}
                        />
                )}
                {postHtml}
            </FormItem>

        );
    }

}

export default injectIntl(RelativeDay);
