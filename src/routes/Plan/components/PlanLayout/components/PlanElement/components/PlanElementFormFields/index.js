import React from 'react';

import {LoadingModal} from "../../../../../../../../components/Loading/index";


import TreatmentElementFormFields, {prepareInput as prepareTreatmentInput} from '../PlanElementFormFields/components/TreatmentElementFormFields';
import DecisionElementFormFields, {prepareInput as prepareDecisionInput} from '../PlanElementFormFields/components/DecisionElementFormFields';
import OptionsElementFormFields, {prepareInput as prepareOptionsInput} from '../PlanElementFormFields/components/OptionsElementFormFields';
//import TextInputElementFormFields, {prepareInput as prepareTextInputInput} from '../PlanElementFormFields/components/TextInputElementFormFields';
import FileInputElementFormFields, {prepareInput as prepareFileInput} from '../PlanElementFormFields/components/FileInputElementFormFields';
import ScaleElementFormFields from '../PlanElementFormFields/containers/ScaleElementFormFields';
import {prepareInput as prepareScaleInput} from "../PlanElementFormFields/components/ScaleElementFormFields";

import AssessmentElementFormFields from '../PlanElementFormFields/containers/AssessmentElementFormFields';
import {prepareInput as prepareAssessmentInput} from "../PlanElementFormFields/components/AssessmentElementFormFields";
import MediaElementFormFields, {prepareInput as prepareMediaInput} from '../PlanElementFormFields/components/MediaElementFormFields';
import TextElementFormFields, {prepareInput as prepareTextInput} from '../PlanElementFormFields/components/TextElementFormFields';
import LineElementFormFields, {prepareInput as prepareLineInput} from '../PlanElementFormFields/components/LineElementFormFields';
import LinkElementFormFields, {prepareInput as prepareLinkInput} from '../PlanElementFormFields/components/LinkElementFormFields';
// pathway
import StageElementFormFields, {prepareStageInput} from '../PlanElementFormFields/containers/StageElementFormFields';

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};
const formTailLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 20, offset: 4},
};


export default class PlanElementFormFields extends React.Component{

    static defaultProps = {
        loading:false,
        type: '',
        element:{},
        schedule:false
    }


    getInputValues = (values) => {
        //console.log(values);
        console.log(this.prepareInput);
        return this.prepareInput(values);
    }


    render(){

        const {loading, onHide, schedule, ref, mode} = this.props;

        if (loading) {
            return <LoadingModal />;
        }

       // console.log(this.props);
        const {id, element, type, planId, form, handleSave} = this.props;
        let block = null;

        const propsForElement = {
            id,
            planId,
            handleSave:handleSave,
            //blockId,
            //blockIsAction,
            details: element.itemInfo,
            type,
            onHide,
            schedule,
            formItemLayout,
            formTailLayout,
            form,
            mode
        };

        switch(type) {
            default:
                break;
            case 'options':
            case 'choice_input':
            case 'checklist':
                this.prepareInput = prepareOptionsInput;
                block = <OptionsElementFormFields {...propsForElement} />;
                break;
            case 'decision':
                this.prepareInput = prepareDecisionInput;
                block = <DecisionElementFormFields {...propsForElement} element={element} />;
                break;
            case 'textInput':
                //this.prepareInput = prepareTextInputInput;
                //block = <TextInputElementFormFields {...propsForElement} />;
                break;
            case 'fileInput':
                this.prepareInput = prepareFileInput;
                block = <FileInputElementFormFields {...propsForElement} />;
                break;
            case 'scale':
                this.prepareInput = prepareScaleInput;
                block = <ScaleElementFormFields {...propsForElement} />;
                break;
            case 'assessment':
                this.prepareInput = prepareAssessmentInput;
                block = <AssessmentElementFormFields {...propsForElement} />;
                break;
                // output
            case 'text':
                this.prepareInput = prepareTextInput;
                block = <TextElementFormFields {...propsForElement} ref={ref}/>;
                break;
            case 'image':
            case 'video':
            case 'audio':
            case 'ppt':
            case 'pdf':
                this.prepareInput = prepareMediaInput;
                block = <MediaElementFormFields {...propsForElement} />;
                break;
                // tools
            case 'line':
                this.prepareInput = prepareLineInput;
                block = <LineElementFormFields {...propsForElement} />;
                break;
            case 'link':
                this.prepareInput = prepareLinkInput;
                block = <LinkElementFormFields {...propsForElement} />;
                break;
            case 'tipbox':
                this.prepareInput = prepareTextInput;
                block = <TextElementFormFields tip {...propsForElement} />;
                break;
            case 'embed':
                this.prepareInput = prepareTextInput;
                block = <TextElementFormFields embed {...propsForElement} />;
                break;
            case 'treatment':
                this.prepareInput = prepareTreatmentInput;
                block = <TreatmentElementFormFields embed {...propsForElement} />;
                break;

                // pathway
            case 'stage':
                //console.log(element);
                this.prepareInput = prepareStageInput;
                block = <StageElementFormFields embed {...propsForElement} stageId={element.itemId} />;
                break;
        }
        return <div>{block}</div>;
    }

}