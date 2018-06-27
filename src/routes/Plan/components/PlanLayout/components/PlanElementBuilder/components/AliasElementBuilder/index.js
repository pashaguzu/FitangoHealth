import React from 'react';
import {Cascader, Input, Form} from 'antd';
import messages from './messages';
import {injectIntl} from 'react-intl';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};

const placements = {
    bottomLeft: {
        points: ['tl', 'bl'],
        offset: [0, 4],
        overflow: {
            adjustY: 1,
        },
    },
    topLeft: {
        points: ['bl', 'tl'],
        offset: [0, -4],
        overflow: {
            adjustY: 1,
        },
    },
    bottomRight: {
        points: ['tr', 'br'],
        offset: [0, 4],
        overflow: {
            adjustY: 1,
        },
    },
    topRight: {
        points: ['br', 'tr'],
        offset: [0, -4],
        overflow: {
            adjustY: 1,
        },
    },
};

const AliasElementBuilder = (props) => {
    //console.log(props);
    const {options=[], loadData, form, intl, element={}} = props;
    const {getFieldDecorator} = form;
    const {itemInfo={}} = element;
    const {elementRoute=[]} = itemInfo;
    //console.log(elementRoute);
    return <React.Fragment>
    <FormItem
        {...formItemLayout}
        label={intl.formatMessage(messages.description)}
    >
        {getFieldDecorator('label', {
                initialValue:itemInfo.label,
                rules: [{required: true, message: "Enter Label", whitespace: true}],

            }
        )(
            <Input />
        )}
    </FormItem>
        <FormItem
            {...formItemLayout}
            label={intl.formatMessage(messages.btnLabel)}
        >
            {getFieldDecorator('btnLabel', {
                    initialValue:itemInfo.btnLabel,
                    rules: [{message: "Enter Button Label", whitespace: true}],
                }
            )(
                <Input />
            )}
        </FormItem>
    <FormItem
        {...formItemLayout}
        label={intl.formatMessage(messages.title)}

    >
        <div id="cascader" style={{position: 'relative' }}>
                {getFieldDecorator('elementId', {
                        initialValue: elementRoute,
                        //rules: [{message: "Select Element"}],
                    }
                )(
                    <Cascader options={options} getPopupContainer={() => document.getElementById('cascader')} loadData={loadData} placeholder="Please Select Element" changeOnSelect
                              style={{width: '100%'}} />
                )}
        </div>
    </FormItem>
    </React.Fragment>;
}

export default injectIntl(AliasElementBuilder);


export const prepareInput = (values) => {
    const {elementId=[], label, btnLabel} = values;
    const element = elementId[elementId.length - 1];
    return {
        //schedule:schedule,
        aliasElement: {
            elementId:element,
            elementRoute:elementId,
            label,
            buttonLabel:btnLabel
        }
    }
}