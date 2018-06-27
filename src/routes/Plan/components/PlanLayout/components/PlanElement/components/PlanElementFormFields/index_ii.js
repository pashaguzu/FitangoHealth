import React from 'react';
import {Modal, Form} from 'antd';
import {injectIntl} from 'react-intl';
import PlanElementSchedule from './containers/PlanElementSchedule';
import messages from './messages';

class EditorModal extends React.Component {

    elementExists = () => {
        const {element={}} = this.props;
        return element.id || false;
    };

    mutationCallback = () => {
        this.props.onHide();
    };

    prepareInput = (values) => {
        let input = this.props.prepareInput(values);

        const {schedule} = values;

        return {
            schedule,
            ...input
        }

    };

    handleSubmit = () => {
        const { addLessonElement, addActivityElement, addIntroElement, addPathwayElement, updateElement, lessonId, sectionId, mode } = this.props;
        this.props.form.validateFields((err, values) => {
            //console.log(this.elementExists());
            //console.log(values);
            //lessonId

            console.log(this.props);

            if (!err) {
                const input = this.prepareInput(values);
                if (!this.elementExists()) {

                    if (mode == 'pathway') {
                        return addPathwayElement(input).then(() => {
                            this.mutationCallback();
                        });
                    } else if (lessonId) {
                        // lesson
                        return addLessonElement(input).then(() => {
                            this.mutationCallback();
                        });
                    } else if (sectionId) {
                        return addActivityElement(input).then(() => {
                            this.mutationCallback();
                        });
                    } else {
                        return addIntroElement(input).then(() => {
                            this.mutationCallback();
                        });
                    }

                } else {
                    return updateElement(input).then(() => {
                        this.mutationCallback();
                    });
                }
            }
        });
    };

    render() {
        const {intl, children, onOk, title='Element', onHide} = this.props;
        const modalTitle = intl.formatMessage(this.elementExists() ? messages.modalEditTitle : messages.modalAddTitle, {title:title});
        return (
            <Modal
                title={modalTitle}
                visible={true}
                onCancel={onHide}
                width={600}
                okText={intl.formatMessage(messages.send)}
                onOk={this.handleSubmit}
            >
                <Form>
                    {children}

                    <PlanElementSchedule {...this.props} />
                </Form>
            </Modal>
        );
    }
}

export default injectIntl(EditorModal);

