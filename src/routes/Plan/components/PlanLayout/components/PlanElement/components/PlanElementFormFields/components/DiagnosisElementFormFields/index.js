import React from 'react';
import {Form} from 'antd';
import {injectIntl} from 'react-intl';
import DiagnosisSelect from "../../../../../../../../../../components/Autosuggest/containers/DiagnosisSelect";
import Diagnoses from '../../../../../../../../../Health/containers/Diagnoses';
import messages from './messages';

const FormItem = Form.Item;

export const prepareInput = (values) => {
    const {text} = values;

    return {
        diagnosisElement: {
            text
        }
    }
}

class DiagnosisElementFormFields extends React.Component {

    render() {
        const {form, intl, formItemLayout, userId} = this.props;
        const {getFieldDecorator} = form;

        return (
            <React.Fragment>
                <Diagnoses userId={userId} />


                {/*<FormItem
                    {...formItemLayout}
                    label={intl.formatMessage(messages.title)}
                >
                    {getFieldDecorator('text', {
                            rules: [{required: true, message: "Select Diagnosis", whitespace: true}],
                        }
                    )(
                        <DiagnosisSelect />
                    )}
                </FormItem>*/}
            </React.Fragment>
        );
    }
}

export default injectIntl(DiagnosisElementFormFields);