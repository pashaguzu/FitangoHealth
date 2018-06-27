import React from 'react';
import {Form} from 'antd';
import {LoadingModal} from "../../../../../../../../components/Loading/index";


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

import EditorModal from '../../containers/Editors';


const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};
const formTailLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 20, offset: 4},
};


class PlanElementEditModal extends React.Component{

    static defaultProps = {
        loading:false,
        type: '',
        element:{},
        schedule:false
    }


    render(){

        const {loading, onHide, schedule} = this.props;

        if (loading) {
            return <LoadingModal />;
        }
        //console.log(this.props);
        const {element, type, planId, form} = this.props;
        let block = null;
        let prepareInput = null;

        const propsForElement = {
            planId,
            //blockId,
            //blockIsAction,
            details: element.itemInfo,
            type,
            onHide,
            schedule,
            formItemLayout,
            formTailLayout,
            form
        };

        switch(type) {
            default:
                break;
            case 'options':
            case 'choice_input':
            case 'checklist':
                prepareInput = prepareOptionsInput;
                block = <OptionsElementFormFields {...propsForElement} />;
                break;
            case 'case':
                prepareInput = prepareOptionsInput;
                block = <OptionsElementFormFields {...propsForElement} />;
                break;
            case 'textInput':
                //prepareInput = prepareTextInputInput;
                //block = <TextInputElementFormFields {...propsForElement} />;
                break;
            case 'fileInput':
                prepareInput = prepareFileInput;
                block = <FileInputElementFormFields {...propsForElement} />;
                break;
            case 'scale':
                prepareInput = prepareScaleInput;
                block = <ScaleElementFormFields {...propsForElement} />;
                break;
            case 'assessment':
                prepareInput = prepareAssessmentInput;
                block = <AssessmentElementFormFields {...propsForElement} />;
                break;
                // output
            case 'text':
                prepareInput = prepareTextInput;
                block = <TextElementFormFields {...propsForElement} />;
                break;
            case 'image':
            case 'video':
            case 'audio':
            case 'ppt':
            case 'pdf':
                prepareInput = prepareMediaInput;
                block = <MediaElementFormFields {...propsForElement} />;
                break;
                // tools
            case 'line':
                prepareInput = prepareLineInput;
                block = <LineElementFormFields {...propsForElement} />;
                break;
            case 'link':
                prepareInput = prepareLinkInput;
                block = <LinkElementFormFields {...propsForElement} />;
                break;
            case 'tipbox':
                prepareInput = prepareTextInput;
                block = <TextElementFormFields tip {...propsForElement} />;
                break;
            case 'embed':
                prepareInput = prepareTextInput;
                block = <TextElementFormFields embed {...propsForElement} />;
                break;

                // pathway
            case 'stage':
                //console.log(element);
                prepareInput = prepareStageInput;
                block = <StageElementFormFields embed {...propsForElement} stageId={element.itemId} />;
                break;
                break;
        }
        return <EditorModal
            prepareInput={prepareInput}
            {...this.props}
        >{block}</EditorModal>;
    }

}


const WrappedPlanElementEditModal = Form.create()(PlanElementEditModal);

export default WrappedPlanElementEditModal;