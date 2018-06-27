import React from 'react';
import {Input, Col} from 'antd';
import {compose, withState, withHandlers} from 'recompose';

const InputGroup = Input.Group;

const InputUnitsPure = props => {
    const {placeholderUnits='cm or mm', value='', units=''} = props;
    return <React.Fragment>
        <InputGroup>
            <Col span={8}>
                <Input onChange={props.handleInput} value={value} />
            </Col>
            <Col span={4}>
                <Input onChange={props.handleUnits} value={units} placeholder={placeholderUnits}  />
            </Col>
        </InputGroup>
    </React.Fragment>;
}

export const InputUnits = compose(
    withState('value', 'setValue', props=> props.value || ''),
    withState('units', 'setUnits', props=> props.units || ''),
    withHandlers({
        triggerChange: props => () => {
            const onChange = props.onChange;
            if (onChange) {
                const {value, units} = props;
                onChange({value, units});
            }
        }
    }),
    withHandlers({
        handleInput: props => (e) => {
            const value = e.target.value;
            console.log(value);
            props.setValue(value);
            props.triggerChange();
        },
        handleUnits: props => (e) => {
            const units = e.target.value;
            props.setUnits(units);
            props.triggerChange();
        }
    }),
)(InputUnitsPure);


    export const InputUnitsDecoratorPure = props => {
        const {getFieldDecorator, name, validatorMessage, checkInput} = props;
        return getFieldDecorator(name, {
                rules: [{ validator: checkInput}],
            }
        )(
            <InputUnits />
        )
    };

export const InputUnitsDecorator = withHandlers({
    checkInput: props => (rule, value, callback) => {
        console.log(value);
        if (value.value !== '' && value.units !== '') {
            callback();
            return;
        }
        callback('Error');
    }
})(InputUnitsDecoratorPure);

export const InputUnitsValidator = (rule, value, callback) => {
    //console.log(value);
    if (value) {
        if (value.value !== '' && value.units !== '') {
            callback();
            return;
        }
    }
    callback('Error');
}