import React from 'react';
import {Form, Button, Steps} from 'antd';

import {TumorboardManager} from "../TumorboardManager/index";
import {TumorboardEditorBody} from "./containers/TumorboardEditorBody";

const Step = Steps.Step;

export const TumorboardEditor = props => {
    return <React.Fragment>
        <Steps size="small" current={props.step} style={{marginBottom:24}}>
            <Step title="Header" onClick={() => props.setStep(0)} />
            <Step title="Cases" onClick={() => props.setStep(1)} />
            <Step title="Invite" onClick={() => props.setStep(2)} />
        </Steps>
        <TumorboardEditorBody {...props} />
    </React.Fragment>;
}

export default TumorboardEditor;