import React from 'react';
import { compose, branch, renderComponent, withProps, mapProps } from 'recompose';
import {Steps, Form, Input, Button, Icon, Checkbox, Tooltip} from 'antd';
import DecisionElementOptions from './components/DecisionElementOptions';
import DecisionElementActions  from './containers/DecisionElementActions';


const Step = Steps.Step;

const isStep1 = ({ current }) => (current === 0);
const isStep2 = ({ current }) => (current === 1);

const debug = withProps(console.log);

const conditionalRender = (states) =>
    compose(...states.map(state =>
        branch(state.when, renderComponent(state.then))
    ));

const enhance = compose(
    debug, // print out the props here
    //mapProps(/*...args*/),
    conditionalRender([
        //{ when: isStep1, then: DecisionElementOptions },
        { when: isStep2, then: DecisionElementActions }
    ])
);

const DecisionElement = enhance(DecisionElementOptions);

const steps = [{
    title: 'Basic',
}, {
    title: 'Decisions',
}];

export default class DecisionElementFormFields extends React.Component {

    state = {
        current: 0,
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
        console.log(this.props);
        const callback = (item) => {
            //console.log(item);
            //const {id=''} = item;
            this.setState({current})
        };
        this.props.form.validateFields((err, values) => {

            if (!err) {
                if (current === 1) {
                    // save the element
                    //this.props.handleSave(callback);
                    callback();
                } else {
                    callback()
                }
                /* const letters = form.getFieldValue('letters');
                 if (current === 1) {
                     if (letters && letters.length == 0) {
                         // show error
                         return false;
                     }
                 }*/

            }
        });
    }

    render() {
        //const { isModalVisible, hidePaymentModal, orderDetails } = this.props;

        console.log(this.props.form.getFieldsValue());
        return (
            <React.Fragment>
                <Steps size="small" current={this.state.current}>
                    {steps.map(item => <Step key={item.title} title={item.title} />)}
                </Steps>

            <DecisionElement {...this.state} {...this.props}  />

                <div className="steps-action">
                    {
                        this.state.current < steps.length - 1
                        &&
                        <Button type="primary" onClick={() => this.next()}>Next</Button>
                    }
                    {
                        this.state.current === steps.length - 1
                        &&
                        <Button type="primary" >Done</Button>
                    }
                    {
                        this.state.current > 0
                        &&
                        <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                            Previous
                        </Button>
                    }
                </div>
            </React.Fragment>
        );
    }
}


export const prepareInput = (values) => {
    //console.log(values);
    const {title, schedule} = values;
    let {keys, options, ids=[]} = values;
    //console.log(values);
    //console.log(options);
    options = keys.map(i => {
        const id =  ids[i] || '';// ? timesPerHour[i]['id'] : '';
        const option = options[i] || '';
        return {id, 'label': option}
    });

    return {
        schedule:schedule,
        decisionElement: {
            title:title,
            options:options
        }
    }
}


