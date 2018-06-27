import React from 'react';
import {Options} from "../../../../../../../../components/FormCustomFields/components/Options/index";
import {Form} from 'antd';
const TumorbaordNexctSteps = props => {
    const {form} = props;
    return <Options form={form} options={[]} title={false} required={false} />
}

export default Form.create()(TumorbaordNexctSteps);