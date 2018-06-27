import React from 'react';
import {Modal, Form} from 'antd';
import {injectIntl} from 'react-intl';
import PlanElementSchedule from './containers/PlanElementSchedule';
import PlanElementFormFields from '../../components/PlanElementFormFields';
import messages from './messages';

class PlanElementManager extends React.Component {

    elementExists = () => {
        const {element={}} = this.props;
        return element.id || false;
    };

    mutationCallback = () => {
        this.props.onHide();
    };

    prepareInput = (values) => {
        const input = this.el.getInputValues(values);
        const {schedule} = values;

        return {
            schedule,
            ...input
        }

    };

    handleSubmit = () => {
        this.handleSave(this.mutationCallback);
    };

    handleSave = (callback) => {
        const { addLessonElement, addActivityElement, addIntroElement, addPathwayElement, updateElement, lessonId, sectionId, mode, onAdd } = this.props;
        this.props.form.validateFields((err, values) => {

            if (!err) {
                const input = this.prepareInput(values);
                //console.log(input);
                if (!this.elementExists()) {

                    if (mode == 'pathway') {
                        return addPathwayElement(input).then(({data}) => {
                            const element = data.addPathwayElement;
                            onAdd(element.id)
                            callback(element);
                        });
                    } else if (lessonId) {
                        // lesson
                        return addLessonElement(input).then(({data}) => {
                            const element = data.addLessonElement;
                            onAdd(element.id)
                            callback(element);
                        });
                    } else if (sectionId) {
                        return addActivityElement(input).then(({data}) => {
                            const element = data.addActivityElement;
                            onAdd(element.id)
                            callback(element);
                        });
                    } else {
                        return addIntroElement(input).then(({data}) => {
                            const element = data.addIntroElement;
                            onAdd(element.id)
                            callback(element);
                        });
                    }

                } else {
                    return updateElement(input).then(({data}) => {
                        callback(data.updatePlanElement);
                    });
                }
            }
        });
    }


    useFooter = () => {
        const{type=''} = this.props;

        return type === 'decision' ? null : '';
    }

    render() {
        const {intl, children, title='Element', onHide} = this.props;
        const modalTitle = intl.formatMessage(this.elementExists() ? messages.modalEditTitle : messages.modalAddTitle, {title:title});
        return (
            <Modal
                title={modalTitle}
                visible={true}
                onCancel={onHide}
                width={600}
                /*footer={this.useFooter}*/
                okText={intl.formatMessage(messages.send)}
                onOk={this.handleSubmit}
            >
                <Form>
                    <PlanElementFormFields {...this.props} handleSave={this.handleSave} ref={instance => {this.el = instance; }} />
                    <PlanElementSchedule {...this.props} />
                </Form>
            </Modal>
        );
    }
}

const WrappedPlanElementManager = Form.create()(PlanElementManager);

export default injectIntl(WrappedPlanElementManager);

