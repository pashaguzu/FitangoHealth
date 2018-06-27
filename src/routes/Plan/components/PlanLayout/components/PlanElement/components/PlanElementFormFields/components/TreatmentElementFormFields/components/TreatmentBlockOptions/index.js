import React from 'react';
import {Form, Button} from 'antd';

import TreatmentBlockManage from '../../containers/TreatmentBlockManage';
 
const TreatmentBlockOptions = (props) => {
    const {loading, planId, mode, blocks=[], details={}} = props;
    const treatmentId = details.id;

    if (loading) {
        return <div>Loading...</div>
    }
    return <div>
        <div>{blocks.map((block, i) => <TreatmentBlockManage planId={planId} mode={mode} key={i} k={i} treatmentId={treatmentId} details={block} />)}</div>
        <div style={{marginTop:10}}>
            <Button type="primary" onClick={props.prev} style={{width: '60%'}}>
            Previous
            </Button>
        </div></div>;
}


export default (TreatmentBlockOptions);

