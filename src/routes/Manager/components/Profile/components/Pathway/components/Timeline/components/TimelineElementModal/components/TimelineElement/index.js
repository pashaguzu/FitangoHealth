import React from 'react';
import PropTypes from 'prop-types';

import LinkElementFormFields, {prepareInput as preparelinkInput} from '../../../../../../../../../../../Plan/components/PlanLayout/components/PlanElement/components/PlanElementFormFields/components/LinkElementFormFields';
import DiagnosisElementFormFields, {prepareInput as prepareDiagnosisInput} from '../../../../../../../../../../../Plan/components/PlanLayout/components/PlanElement/components/PlanElementFormFields/components/DiagnosisElementFormFields';
import ApsElementFormFields from '../../../../../../../../../../../Plan/components/PlanLayout/components/PlanElement/components/PlanElementFormFields/components/ApsElementEditor/components/ApsElementFormFields';
import StageElementFormFields, {prepareInput as prepareStageInput}  from '../../../../../../../../../../../Plan/components/PlanLayout/components/PlanElement/components/PlanElementFormFields/components/StageElementFormFields';
import TextElementFormFields, {prepareInput as prepareTextInput} from '../../../../../../../../../../../Plan/components/PlanLayout/components/PlanElement/components/PlanElementFormFields/components/TextElementFormFields';
import TreatmentElementBuilder, {prepareInput as prepareTreatmentInput}  from '../../../../../../../../../../../Plan/components/PlanLayout/components/PlanElementBuilder/components/TreatmentElementBuilder';

class TimelineElement extends React.Component {

    static defaultProps = {
        element:PropTypes.object,
        type:PropTypes.string
    };

    getInputValues = (values) => {
        //console.log(values);
        //console.log(this.prepareInput);
        return this.prepareInput(values);
    }

    getType = () => {
        return this.props.element.itemType;
    };

    render() {
        const {form, formItemLayout, userId} = this.props;
        let {element} = this.props;


        let block = '';
        const defaultProps = {
            form,
            formItemLayout,
            userId
        }
        // console.log(this.props);
        // console.log(this.getType());
        switch(this.getType()) {
            case 'link':
                block = <LinkElementFormFields {...defaultProps}  />;
                this.prepareInput = preparelinkInput;
                break;
            case 'diagnosis':
                this.prepareInput = prepareDiagnosisInput;
                block = <DiagnosisElementFormFields {...defaultProps} />;
                break;
            case 'ap':
                block = <ApsElementFormFields {...defaultProps} />;
                break;
            case 'stage':
                this.prepareInput = prepareStageInput;
                block = <StageElementFormFields {...defaultProps} />;
                break;
            case 'clinical_note':
                this.prepareInput = prepareTextInput
                block = <TextElementFormFields {...defaultProps} />;
                break;
            case 'treatment':
                this.prepareInput = prepareTreatmentInput;

                //element.id = '';// reset ID
                const elements = element.itemInfo.elements.map(element => {
                    return {...element, id:''};
                });
                //element.
                block = <TreatmentElementBuilder element={element} elements={elements} {...defaultProps} />
                break;
        }
        return (
            <div>
                {block}
            </div>
        );
    }
}

export default TimelineElement;

