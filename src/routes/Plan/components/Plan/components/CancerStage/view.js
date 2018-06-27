import React from 'react';
import {Form, Select, Input} from 'antd';


 const CancerStage = (props) => {
    const {item={}} = props;
    const {title=''} = item;


    // format rules
    // stage and optiosn


    return (
        <React.Fragment>
            Cancer Stage: {title}
        </React.Fragment>
    );
}

export default CancerStage;
