import React from 'react';
import PropTypes from 'prop-types';
import {Modal, message, Form, Input, Divider, Switch} from 'antd';
import { compose, branch, renderComponent, withProps, withHandlers, withState, mapProps} from 'recompose';
import moment from 'moment';
import {getTimelineElementTitle} from "../TimelineElementSelect/index";

//import {PlanElementWithQuery} from "../../components/PlanElement/containers/PlanElementManager";
//import {withMutation, withAddMutation } from '../../components/PlanElementBuilder/mutations';
import TreatmentElement from './containers/TreatmentElement';
import ClinicalNoteElement from './containers/ClinicalNoteElement';
import ClinicalTrialElement from './containers/ClinicalTrialElement';
import LinkElement from './containers/LinkElement';
import ChecklistElement from './containers/ChecklistElement';
import CancerStageElement from './containers/CancerStageElement';
import DiagnosisElement from './containers/DiagnosisElement';
import BlankElementBuilder from "../../../../../../../../../Plan/components/PlanLayout/components/PlanElementBuilder/containers/BlankElementBuilder";
import ApElementBuilder from "../../../../../../../../../Plan/components/PlanLayout/components/PlanElementBuilder/containers/ApElementBuilder";
import MediaElementBuilder from "../../../../../../../../../Plan/components/PlanLayout/components/PlanElementBuilder/containers/MediaElementBuilder";




// const createFormField = Form.createFormField;
//
// const formItemLayout = {
//     labelCol: {span: 6},
//     wrapperCol: {span: 18},
// };
// const formTailLayout = {
//     labelCol: {span: 6},
//     wrapperCol: {span: 20, offset: 4},
// };


const debug = withProps(console.log);

const conditionalRender = (states) =>
    compose(...states.map(state =>
        branch(state.when, renderComponent(state.then))
    ));

const enhance = compose(
    debug, // print out the props here

    //branch(props => props.id !== '', PlanElementWithQuery),
    //branch(props => props.id !== '', withMutation, withAddMutation),
    mapProps(props => {

        if (props.element) {
            const details = props.element.itemInfo;
            return {...props, details, type:props.element.itemType, resetInitInfo:true};
        } else if (props.item) {
            const {item} = props;
            const details = item.activity;
            return {...props, details, type:item.type, element: item};
        }
        return props;
    }),
    Form.create(),
    withHandlers({
        handleSave: props => ({prepareInput, input, callback}) => {
            //
            //console.log(input);
            props.form.validateFields((err, values) => {

                if (!err) {
                    const {element = {}} = props;
                    const {id:elementId=''} = element;

                    const {timeline={}} = values;
                    const {notes='', date, isCritical=false} = timeline;
                    //const datetime = moment(values.date).format('L');
                    const inputFromElement = prepareInput(values);
                    console.log(values);
                    let sourceInfo = {};
                    if (props.pathway) {
                        //console.log(props);

                        sourceInfo['type'] = 'pathway';
                        sourceInfo['id'] = props.pathway.id;
                        sourceInfo['elementId'] = elementId;
                    }
                    const input = {...inputFromElement, notes, sourceInfo, isCritical, date: moment(date).format('YYYY-MM-DD')}
                    //console.log(input);
                    props.submitTimelineElement(input).then(() => {
                        if (elementId !== '') {
                            message.success('Updated');
                        } else {
                            message.success('Added');
                        }

                        props.onHide();
                    });
                }
            });
        },
        modalTitle: props => () => {
            //console.log(props);
            const {type, element={}} = props;
            const {id} = element;
            if (id) {
                return 'Edit '+getTimelineElementTitle(type);
            }
            //console.log(element);
            return 'Add '+getTimelineElementTitle(type);
        }
    }),
    branch(props => {
        const {element={}} = props;
        const {activity=false} = element;
        return activity;
    }, withProps(
        props => {
            //console.log(props);

            const {element} = props;
            const {activity} = element;

            return {
                element: {
                    ...element,
                    itemInfo: {
                        ...activity,
                    }
                }
            }

        }
    )),

    conditionalRender([
        {when: ({type}) => type === 'treatment', then: TreatmentElement},
        {when: ({type}) => type === 'checklist', then: ChecklistElement},
        {when: ({type}) => type === 'diagnosis', then: DiagnosisElement},
        {when: ({type}) => type === 'cancer_stage', then: CancerStageElement},
        {when: ({type}) => type === 'link', then: LinkElement},
        {when: ({type}) => type === 'clinical_note', then: ClinicalNoteElement},
        {when: ({type}) => type === 'clinical_trial', then: ClinicalTrialElement},
        {when: ({type}) => type === 'ap', then: ApElementBuilder},
        { when: ({type}) => type === 'media', then: MediaElementBuilder },
    ]),

);


export default enhance(BlankElementBuilder);
//export default enhance(BlankElementBuilder);


// class TimelineElementModal extends React.Component {
//
//     static propTypes = {
//         type: PropTypes.string,
//         element: PropTypes.shape({
//             itemInfo: PropTypes.object,
//             //fontSize: PropTypes.number
//         })
//     }
//     static defaultProps = {
//         type:'',
//
//     }
//
//
//     handleSubmit = () => {
//
//         //console.log(this.props);
//         //const { addElement, updateElement } = this.props;
//         this.props.form.validateFields((err, values) => {
//
//             if (!err) {
//                 //console.log(values);
//                 const {timeline} = values;
//                 const {notes, date} = timeline;
//                 //const datetime = moment(values.date).format('L');
//                 const inputFromElement = this.el.getInputValues(values);
//                 const input = {...inputFromElement, notes, date:moment(date).format('YYYY-MM-DD')}
//                 //console.log(input);
//                 this.props.submitTimelineElement(input).then(() => {
//                     message.success('Added');
//                     this.props.onHide();
//                 });
//             }
//         });
//     };
//
//     render() {
//         const {form, intl, element, type, userId} = this.props;
//         const {getFieldDecorator} = form;
//
//         return (
//             <Modal
//                 title={intl.formatMessage(messages.modalTitle)}
//                 visible={true}
//                 onOk={this.handleSubmit}
//                 onCancel={this.props.onHide}
//             >
//                 <Form>
//                     <TimelineElement
//                         ref={instance => { this.el = instance; }}
//                         userId={userId}
//                         form={form} type={type} element={element} formItemLayout={formItemLayout} />
//
//
//                 </Form>
//             </Modal>
//         );
//     }
// }
//
// const WrappedTimelineElementModal = Form.create({
//     mapPropsToFields(props) {
//
//         //console.log(props);
//         const {element} = props;
//         if (!element) {
//             return;
//         }
//         const {itemInfo} = element;
//         const {text} = itemInfo;
//
//
//
//         return {};
//         return {
//             date:createFormField({
//                 value:moment()
//             }),
//             time:createFormField({
//                 value:moment()
//             }),
//             description:createFormField({
//                 value:text
//             }),
//         }
//     }
// })(TimelineElementModal);
// export default injectIntl(WrappedTimelineElementModal);

