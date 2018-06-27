import React from 'react';
import {Form, Select} from 'antd';
import {injectIntl} from 'react-intl';
import messages from './messages';

const FormItem = Form.Item;
const Option = Select.Option;
/*
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
*/

export const prepareInput = (values) => {
    const {stageId} = values;

    return {
        stageElement: {
            stageId
        }
    }
}


 class StageElementFormFieldsPure extends React.Component {

    static defaultProps = {
        details:{}
    }

    render() {
        const {form, loading, intl, stages=[], formItemLayout, details, stageId=''} = this.props;
        const {getFieldDecorator} = form;
        //const {id=''} = details;
        //console.log(this.props);
        return (
            <React.Fragment>
                <FormItem
                    {...formItemLayout}
                    label={intl.formatMessage(messages.stage)}
                >
                    {getFieldDecorator('stageId', {
                            initialValue:stageId,
                            rules: [{required: true, message: "Select Cancer Stage"}],
                        }
                    )(
                        <Select placeholder={loading? 'Loading Stages' : 'Select'}>
                            {stages.map(stage => <Option key={stage.id} >{stage.title}</Option>)}
                        </Select>
                    )}
                </FormItem>
            </React.Fragment>
        );
    }
}


const StageElementFormFields = injectIntl(StageElementFormFieldsPure);
export default StageElementFormFields;

