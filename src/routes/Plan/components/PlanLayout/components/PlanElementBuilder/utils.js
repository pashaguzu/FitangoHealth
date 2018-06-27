import React from 'react';
import {Icon} from 'antd';
export const getLabelFromElement = (element={}, props={}) => {
    const {itemInfo:item={},itemType, type, typeText} = element;
    const {isBuilderMode=false} = props;
    let fieldTitle = '';
    //console.log(element, item);
    switch(itemType) {
        default: break;
        case 'measurement_input':
            //const {measurement={}} = item;
            fieldTitle = item.label;//<Measurement item={item} date={date} onChange={this.onChange} />
            break;
        case 'choice_input':
        case 'checklist':
            console.log(item);
            fieldTitle = item.label;
            break;
        case 'radio_input':
            fieldTitle = item.label;
            break;
        case 'text_input':
            fieldTitle = item.label;
            break;
        case 'dropdown_input':
        case 'condition':
            fieldTitle = item.label;
            break;
        case 'decision':
            fieldTitle = item.label;
            break;
        case 'scale_input':
            fieldTitle = item.label;
            break;
        case 'file_input':
            fieldTitle = item.label;
            break;
        case 'exam_input':
            fieldTitle = item.name;
            break;
        case 'instruction':
        case 'instruction_embed':
            break;
        case 'clinical_note':
            fieldTitle = item.title || '';
            break;
        case 'line':
            fieldTitle = 'Line';
            break;
        case 'instruction_tipbox':
            fieldTitle = 'Tipbox';
            break;
        case 'link':;
            fieldTitle = item.label;
            break;
        case 'media':
            fieldTitle = item.label;
            //field = <PlanMedia item={item} />
            break;
        case 'treatment':
            fieldTitle = item.title;
            break;
        case 'diagnosis':
            fieldTitle = 'Diagnosis';
            break;
        case 'cancer_stage':
            fieldTitle = 'Stage';
            break;
        case 'alias':
            fieldTitle = item.label || '';//getLabelFromElement(element.itemInfo);
            break;
        case 'ap':
            fieldTitle = item.title;
            break;

    }
    if (1===1 || isBuilderMode) {
        fieldTitle = typeText+(fieldTitle !== '' ? ' – ' : '')+ fieldTitle;
    }

    return fieldTitle;
}