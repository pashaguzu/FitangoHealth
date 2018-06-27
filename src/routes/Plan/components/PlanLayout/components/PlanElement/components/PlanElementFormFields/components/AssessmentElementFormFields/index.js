import React from 'react';
import {Form, Select} from 'antd';
import {injectIntl} from 'react-intl';
import messages from './messages';

const Option = Select.Option;
const FormItem = Form.Item;


export const prepareInput = (values) => {
    const {assessmentId, title} = values;

    return {
        assessmentElement: {
            title,
            assessmentId,
        }
    }
}

class AssessmentElementFormFields extends React.Component {

    static defaultProps = {
        details:{}
    }

    render() {
        const {form, loading, intl, assessments=[], formItemLayout, details} = this.props;
        const {getFieldDecorator} = form;
        const {id=''} = details;
        return (
            <React.Fragment>
                    <FormItem
                        {...formItemLayout}
                        label={intl.formatMessage(messages.assessment)}
                    >
                        {getFieldDecorator('assessmentId', {
                            initialValue:id,
                                rules: [{required: true, message: "Select Assessment"}],
                            }
                        )(
                            <Select placeholder={loading? 'Loading Assessments' : 'Select'}>
                                {assessments.map(assessment => <Option key={assessment.id} >{assessment.name}</Option>)}
                            </Select>
                        )}
                    </FormItem>
            </React.Fragment>
        );
    }
}

export default injectIntl(AssessmentElementFormFields);

