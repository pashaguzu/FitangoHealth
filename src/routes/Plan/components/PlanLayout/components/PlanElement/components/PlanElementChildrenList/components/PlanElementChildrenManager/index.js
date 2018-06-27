import React from 'react';
import {Modal, Form} from 'antd';
import {injectIntl} from 'react-intl';
import PlanElementBuilder from '../../../../../../components/PlanElementBuilder';
import messages from './messages';

const PlanElementChildrenManager = props => {
    console.log(props);
    return <PlanElementBuilder {...props} />
}
export default PlanElementChildrenManager;
//
// class PlanElementChildrenManager extends React.Component {
//
//     elementExists = () => {
//         const {element={}} = this.props;
//         return element.id || false;
//     };
//
//     mutationCallback = () => {
//         this.props.onHide();
//     };
//
//     prepareInput = (values) => {
//         const input = this.el.getInputValues(values);
//         const {schedule} = values;
//
//         return {
//             schedule,
//             ...input
//         }
//
//     };
//
//     handleSubmit = () => {
//         this.handleSave(this.mutationCallback);
//     };
//
//     handleSave = (callback) => {
//         const { addChildElement, updateElement, parentId} = this.props;
//         this.props.form.validateFields((err, values) => {
//             //console.log(this.elementExists());
//             //console.log(values);
//             //lessonId
//
//             if (!err) {
//                 const input = this.prepareInput(values);
//                 //console.log(input);
//                 if (!this.elementExists()) {
//                     console.log(this.props);
//                     //console.log(this.props.form.getFieldsValue());
//
//                     if (parentId) {
//                         return addChildElement(input).then(() => {
//                             this.props.onHide();
//                         });
//                     } else {
//                         this.props.onElementAdd(input);
//                         // hide the element
//                         this.props.onHide();
//                     }
//                     // save the info to the form and that's it.
//                     /*return addChildElement(input).then(() => {
//                         callback();
//                     });*/
//                 } else {
//                     return updateElement(input).then(() => {
//                         callback();
//                     });
//                 }
//             }
//         });
//     }
//
//     render() {
//         const {intl, children, title='Element', onHide} = this.props;
//         const modalTitle = intl.formatMessage(this.elementExists() ? messages.modalEditTitle : messages.modalAddTitle, {title:title});
//         return (
//             <Modal
//                 title={modalTitle}
//                 visible={true}
//                 onCancel={onHide}
//                 width={600}
//                 okText={intl.formatMessage(messages.send)}
//                 onOk={this.handleSubmit}
//             >
//                 <Form>
//                     <PlanElementFormFields {...this.props} handleSave={this.handleSave} ref={instance => {this.el = instance; }} />
//                 </Form>
//             </Modal>
//         );
//     }
// }
//
// const WrappedPlanElementChildrenManager = Form.create()(PlanElementChildrenManager);
//
// export default injectIntl(WrappedPlanElementChildrenManager);

