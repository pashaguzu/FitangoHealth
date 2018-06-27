import React from 'react';
import {Form, Select} from 'antd';
import {injectIntl} from 'react-intl';
import messages from './messages';

const FormItem = Form.Item;
const Option = Select.Option;

const tumors = [
    {code:'TX', 'description':'Primary tumor cannot be assessed'},
    {code:'T0',  'description':'No evidence of primary tumor'},
    {code:'Tis',  'description':'Carcinoma in situ'},
    {code:'T1',  'description':'Tumor ≤ 2.0 cm in greatest dimension'},
    {code:'T2',  'description':'Tumor > 2.0 cm but ≤ 5.0 cm in greatest dimension'},
    {code:'T3',  'description':'Tumor > 5.0 cm in greatest dimension'},
    {code:'T4',  'description':'Tumor of any size with direct extension to (A) chest wall or (B) skin, only as described below'}
]

const nodes = [
    {code:'NX', description:'Regional lymph nodes cannot be assessed (e.g., previously removed)'},
    {code:'N0', description:'No regional lymph node metastasis'},
    {code:'N1', description:'Metastasis to movable ipsilateral axillary lymph node(s)'},
    {code:'N2', description:'Metastasis to ipsilateral mediastinal and/or subcarinal lymph node(s)'},
    {code:'N3', description:'Metastasis to contralateral mediastinal, contralateral hilar, ipsilateral or contralateral scalene, or supraclavicular lymph node(s)'},
]

const metastasis = [
    {code:'MX', description:'Distant metastasis cannot be assessed'},
    {code:'M0', description:'No distant metastasis'},
    {code:'M1', description:'Distant metastasis present'},
];


export const prepareInput = (values) => {
    const {t,n,m, stage} = values;

    return {
        stageElement: {
            t,
            n,
            m,
            stage
        }
    }
}


class StageElementFormFields extends React.Component {

    state = {
        stage:''
    }

    calculateStage = () => {
        const {t,n,m} = this.props.form.getFieldsValue();
        if (t && n && m) {
            this.setState({stage: 'Stage I'});
        }
    }

    renderBoxes = (items) => {
        return items.map(({code, description}, i) => <Option key={i}> {code} <small style={{color:'#ccc'}}>{description}</small></Option>)
    }

    render() {
        const {form, intl, formItemLayout} = this.props;
        const {getFieldDecorator} = form;
        const {stage} = this.state;

        return (
            <React.Fragment>
                    <FormItem
                        {...formItemLayout}
                        label={intl.formatMessage(messages.T)}
                    >
                        {getFieldDecorator('t', {
                                rules: [{required: true, message: "Select T"}],
                            }
                        )(
                            <Select onSelect={this.calculateStage}>
                                {this.renderBoxes(tumors)}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={intl.formatMessage(messages.N)}
                    >
                        {getFieldDecorator('n', {
                                rules: [{required: true, message: "Select N"}],
                            }
                        )(
                            <Select onSelect={this.calculateStage}>
                                {this.renderBoxes(nodes)}
                            </Select>
                        )}
                    </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={intl.formatMessage(messages.M)}
                >
                    {getFieldDecorator('m', {
                            rules: [{required: true, message: "Select M"}],
                        }
                    )(
                        <Select onSelect={this.calculateStage}>
                            {this.renderBoxes(metastasis)}
                        </Select>
                    )}
                </FormItem>

                {stage && <FormItem
                    {...formItemLayout}
                    label={intl.formatMessage(messages.stage)}
                >
                    {stage}
                </FormItem>}
            </React.Fragment>
        );
    }
}

export default injectIntl(StageElementFormFields);

