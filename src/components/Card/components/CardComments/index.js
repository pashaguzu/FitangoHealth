import React from 'react';
import {Comments} from "../../../Comments/index";
import './index.less';


export const CardComments = props => {
    return <div className={'ant-card-comments'}><Comments {...props} /></div>
}