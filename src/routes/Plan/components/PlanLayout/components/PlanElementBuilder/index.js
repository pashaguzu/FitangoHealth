import React from 'react';
import {Form} from 'antd';
import { compose, branch, renderComponent, withProps, withHandlers, defaultProps, mapProps} from 'recompose';
import ConditionElementBuilder from './containers/ConditionElementBuilder';
import TreatmentElementBuilder from './containers/TreatmentElementBuilder';
import AliasElementBuilder from './containers/AliasElementBuilder';
import {PlanElementWithQuery} from "../../components/PlanElement/containers/PlanElementManager";
import {withMutation, withAddMutation } from '../../components/PlanElementBuilder/mutations';
import ChecklistElementBuilder from "./containers/ChecklistElementBuilder";
import BlankElementBuilder from "./containers/BlankElementBuilder";
import LinkElementBuilder from "./containers/LinkElementBuilder";
import ClinicalNoteElementBuilder from "./containers/ClinicalNoteElementBuilder";
import ApElementBuilder from "./containers/ApElementBuilder";
import CalculatorElementBuilder from "./containers/CalculatorElementBuilder";
import AssessmentElementBuilder from "./containers/AssessmentElementBuilder";
import ScaleElementBuilder from "./containers/ScaleElementBuilder";
import FileInputElementBuilder from "./containers/FileInputElementBuilder";
import TextInputElementBuilder from "./containers/TextInputElementBuilder";
import OptionsElementBuilder from "./containers/OptionsElementBuilder";
import TextElementBuilder from "./containers/TextElementBuilder";
import LineElementBuilder from "./containers/LineElementBuilder";
import TipboxElementBuilder from "./containers/TipboxElementBuilder";
import EmbedElementBuilder from "./containers/EmbedElementBuilder";
import TrackerElementBuilder from "./containers/TrackerElementBuilder";
import MediaElementBuilder from "./containers/MediaElementBuilder";



const debug = withProps(console.log);

const conditionalRender = (states) =>
    compose(...states.map(state =>
        branch(state.when, renderComponent(state.then))
    ));

const enhance = compose(
    debug, // print out the props here

    branch(props => props.id && props.id !== '', PlanElementWithQuery),
    branch(props => props.id && props.id !== '', withMutation, withAddMutation),
    mapProps(props => {
        let newProps = {...props};

        const type = props.type;

        switch(type) {
            case 'image':
            case 'video':
            case 'audio':
            case 'document':
                newProps.typeMedia = type;
                newProps.type = 'media';

                break;
        }
        const {element=null} = props;
        //console.log(props);
        //console.log(element);
        if (element) {
            const {itemInfo = null} = element;
            //console.log(itemInfo);
            if (itemInfo) {
                newProps = {...newProps, details:itemInfo, element: props.element};
            }
        }
        return newProps;
    }),
    Form.create(),
    withHandlers({
        handleSave: props => ({prepareInput, callback}) => {
            console.log(props, 'Props before input');
            const {type} = props;
            //console.log(input);
            props.form.validateFields((err, values) => {
                //console.log(err);
                //console.log(values);
                if (!err) {
                    let input = prepareInput(values);
                    // add schedule
                    input.schedule = values.schedule || null;
                    //input.extra = values.extra || null;
                    // add additional info

                    // if schedule - add schedule
                    console.log(input, 'Element Input');
                    if (props.addPathwayElement) {
                        props.addPathwayElement(input, type).then(({data}) => {
                            if (callback) {
                                callback(data.addPathwayElement);
                            }
                        });
                    } else if (props.addLessonElement) {
                        props.addLessonElement(input, type).then(({data}) => {
                            if (callback) {
                                callback(data.addLessonElement);
                            }
                        });
                    } else if (props.addActivityElement) {
                        props.addActivityElement(input, type).then(({data}) => {
                            if (callback) {
                                callback(data.addActivityElement);
                            }
                        });
                    }  else if (props.addIntroElement) {
                        props.addIntroElement(input, type).then(({data}) => {
                            if (callback) {
                                callback(data.addIntroductionElement);
                            }
                        });
                    } else if (props.addChildElement) {
                        props.addChildElement(input, type).then(({data}) => {
                            if (callback) {
                                callback(data.addChildElement);
                            }
                        });
                    } else if (props.updateElement) {
                        props.updateElement(input).then(({data}) => {
                            if (callback) {
                                callback(data.updatePlanElement);
                            }
                        });
                    }
                }
            });
        }
    }),
    conditionalRender([
        { when: ({type}) => type === 'condition', then: ConditionElementBuilder },
        { when: ({type}) => type === 'decision', then: ConditionElementBuilder },
        { when: ({type}) => type === 'treatment', then: TreatmentElementBuilder },
        { when: ({type}) => type === 'alias', then: AliasElementBuilder },
        { when: ({type}) => type === 'checklist', then: ChecklistElementBuilder  },
        { when: ({type}) => type === 'diagnosis', then: BlankElementBuilder  },
        { when: ({type}) => type === 'cancer_stage', then: BlankElementBuilder },
        { when: ({type}) => type === 'link', then: LinkElementBuilder },
        { when: ({type}) => type === 'clinical_note', then: ClinicalNoteElementBuilder },
        { when: ({type}) => type === 'ap', then: ApElementBuilder },
        { when: ({type}) => type === 'calculator', then: CalculatorElementBuilder },
        { when: ({type}) => type === 'assessment', then: AssessmentElementBuilder },
        { when: ({type}) => type === 'scale', then: ScaleElementBuilder },
        { when: ({type}) => type === 'textInput', then: TextInputElementBuilder },
        { when: ({type}) => type === 'fileInput', then: FileInputElementBuilder },
        { when: ({type}) => type === 'options', then: OptionsElementBuilder },
        { when: ({type}) => type === 'text', then: TextElementBuilder },
        { when: ({type}) => type === 'line', then: LineElementBuilder },
        { when: ({type}) => type === 'tipbox', then: TipboxElementBuilder },
        { when: ({type}) => type === 'embed', then: EmbedElementBuilder },
        { when: ({type}) => type === 'tracker', then: TrackerElementBuilder },
        { when: ({type}) => type === 'media', then: MediaElementBuilder },
        // { when: ({type}) => type === 'video', then: MediaElementBuilder },
        // { when: ({type}) => type === 'audio', then: MediaElementBuilder },
        // { when: ({type}) => type === 'ppt', then: MediaElementBuilder },
        // { when: ({type}) => type === 'pdf', then: MediaElementBuilder },


    ]),

);



export default enhance(BlankElementBuilder);