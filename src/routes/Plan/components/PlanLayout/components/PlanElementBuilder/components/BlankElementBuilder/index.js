import React from 'react';
import {EmptyList} from "../../../../../../../../components/Loading/index";


const EmptyElementBuilder = (props) => {
    const {text='', intl} = props;
    return <EmptyList>{text}</EmptyList>;
}

export default EmptyElementBuilder;

export const prepareInput = (values) => {
    const {schedule={}} = values;
    return {
        schedule:schedule,
    }
}