import React from 'react';
import {Form} from 'antd';
import {injectIntl} from 'react-intl';
import RegimenElementFormFields from './components/RegimenElementFormFields';

const createFormField = Form.createFormField;

class RegimenElementEditor extends React.Component {

    prepareInput = (values) => {
        const {text, url, description, schedule} = values;

        return {
            schedule:schedule,
            regimenElement: {
                text:text,
                url:url,
                description:description,
            }
        }
    };

    render() {
        const {form} = this.props;

        return (

                <RegimenElementFormFields form={form} />
        );
    }
}

const WrappedRegimenElementEditor = Form.create({
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
})(RegimenElementEditor);

export default injectIntl(WrappedRegimenElementEditor);