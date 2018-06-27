import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import StageLetters from './containers/StageLetters';
import StageRules from './components/StageRules';
import './index.less';
import { Modal, Form, Steps, Button, message } from 'antd';

const Step = Steps.Step;
const FormItem = Form.Item;
const createFormField = Form.createFormField;



class StageManager extends React.Component {

    defaultProps = {
        stage: {}
    }

    constructor(props) {
        super(props);
        this.state = {
            current: 0,
        };
    }
    next() {
        const current = this.state.current + 1;
        this.goTo(current);
    }
    prev() {
        const current = this.state.current - 1;
        this.goTo(current);
    }

    goTo(current) {
        // check if we've added at least one
        const form = this.props.form;

        this.props.form.validateFields((err, values) => {

            if (!err) {
                /* const letters = form.getFieldValue('letters');
                 if (current === 1) {
                     if (letters && letters.length == 0) {
                         // show error
                         return false;
                     }
                 }*/
                this.setState({current});
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values);
            if (!err) {
                const {stage={}} = this.props;

                const {rules:initRules=[]} = stage;
                const callback = this.props.onCancel;

                const {title, rules, letters} = values;
                const input = {
                    title,
                    letters:letters,
                    rules: rules.map((rule, i) => {
                        const initRule = initRules[i] || {};
                        const {id='', options:initOptions=[]} = initRule;
                        const {options, stage} = rule;
                        return {
                            id:id,
                            stage,
                            options: options.map((item, i)=> {

                                const initOption = initOptions[i] || {};
                                const {id=''} = initOption;
                                const letter = letters[i];
                                return {
                                    id,
                                    letter,
                                    name:item
                                }
                            })
                        }
                    })
                };

                //console.log(input);
                // save stage
                if (this.props.id) {
                    this.props.onUpdateSubmit(input, callback);
                } else {
                    this.props.onCreateSubmit(input, callback);
                }
            }
        })
    }

        render() {
            const { current, stage } = this.state;

            //console.log(this.props.form.getFieldsValue());
            const steps = [{
                title: 'Manage Letters',
                content: <StageLetters form={this.props.form} stage={stage} />,
            }, {
                title: 'Manage Rules',
                content: <StageRules form={this.props.form} stage={stage} />,
            }];

            return (
                <Modal
                    visible={true}
                    destroyOnClose
                    maskClosable={false}
                    keyboard={false}
                    okText="Save"
                    onCancel={this.props.onCancel}
                    title={'Manage Stage'}
                    onOk={this.handleSubmit}
                    footer={false}
                    width={600}
                >
                <Form>
                    <Steps current={current} size="small" progressDot>
                        {steps.map((item, i) => <Step key={item.title} title={item.title} onClick={() => this.goTo(i)} />)}
                    </Steps>
                    {steps.map((item, i) => <div key={item.title} className="steps-content" style={{display:(this.state.current === i ? '' : 'none')}}>{item.content}</div>)}
                    <div className="steps-action">
                        {
                            this.state.current < steps.length - 1
                            &&
                            <Button type="primary" onClick={() => this.next()}>Next</Button>
                        }
                        {
                            this.state.current > 0
                            &&
                            <Button style={{ marginRight: 8 }} onClick={() => this.prev()}>
                                Previous
                            </Button>
                        }

                        {
                            this.state.current === steps.length - 1
                            &&
                            <Button type="primary" onClick={this.handleSubmit}>Done</Button>
                        }

                    </div>
                </Form>
                </Modal>
            );
        }
}

const WrappedStageManager = Form.create({
    mapPropsToFields(props) {
        const {stage} = props;
        if (!stage) {
            return;
        }
        const {title, letters, rules} = stage;
        //console.log(stage);

        const rulesArr = [];
        rules.forEach((rule, i) => {
            const {stage, options} = rule;
            //console.log(stage);
            rulesArr[`rules[${i}]`] = createFormField({
                value: {stage,
                    'options': options.map(option => option.name)

                }
            });
        });


        const lettersArr = [];
        if (letters.length > 0) {
            letters.forEach((letter, i) => {
                //console.log(stage);
                lettersArr[`letters[${i}]`] = createFormField({
                    value: letter
                });
            });
        } else {
            lettersArr[`letters`] = createFormField({
                value: []
            });
        }
        //console.log(lettersArr);

        //console.log('mapPropsToFields', props);
        //console.log(lettersArr);
        //console.log(rulesArr);
        //console.log(typeof plan.schedule.limitStartDow);
        //const {type} =  plan.schedule;
        const obj = {
            title: createFormField({
                value: title,
            }),
            keys: createFormField({
                value:  Object.keys(letters)
            }),
            //letters:
            stage_keys: createFormField({
                value:  Object.keys(rules)
            }),
            ...lettersArr,
            ...rulesArr
            /*'rules[0]': createFormField({
                value: {stage:'11'}
            }),*/
        };

        //console.log(obj);

        return obj;
    },
    onValuesChange(_, values) {
        console.log(values);
    },
})(StageManager);
export default WrappedStageManager;