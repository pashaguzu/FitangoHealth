import React from 'react';
import ConditionElementOption from '../../containers/ConditionElementOption';


export const ConditionElementOptions = (props) => {
    console.log(props, 'options');
    //const {planId, mode, openAddOption, details={}} = props;
    //const {id, title='', options=[]} = details;
    const {details={}} = props;
    const {options=[]} = details;
    //console.log(props);
    //console.log(props.form.getFieldsValue());
    //const {title, options} = props.form.getFieldsValue();
    return options.map((option, i) => <ConditionElementOption key={i} option={option} i={i} {...props} />);
}

export default ConditionElementOptions;