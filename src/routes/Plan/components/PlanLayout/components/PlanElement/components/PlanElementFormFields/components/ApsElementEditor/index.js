import React from 'react';
import {Form} from 'antd';
import {injectIntl} from 'react-intl';
import ApsElementFormFields from './components/ApsElementFormFields';

const createFormField = Form.createFormField;

class ApsElementEditor extends React.Component {

    prepareInput = (values) => {
        let input = prepareInput(values);

        const {schedule} = values;

        return {
            schedule,
            ...input
        }

    };

    render() {
        const {form} = this.props;

        return (

                <ApsElementFormFields form={form} />
        );
    }
}

const WrappedApsElementEditor = Form.create({
    /*mapPropsToFields(props) {
        const {details} = props;
        if (!details) {
            return;
        }

        const {itemInfo = {}} = details;
        const {label = '', url = '', description = ''} = itemInfo;

        return {
            text: createFormField({
                value: label
            }),
            url: createFormField({
                value: url
            }),
            description: createFormField({
                value: description
            }),
        }
    }*/
})(ApsElementEditor);

export default injectIntl(WrappedApsElementEditor);