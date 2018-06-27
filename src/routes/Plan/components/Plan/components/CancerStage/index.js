import React from 'react';
import {Form, Select, Input} from 'antd';
import {compose, withState, withHandlers} from 'recompose';
import {injectIntl} from 'react-intl';
import messages from './messages';

const FormItem = Form.Item;
const Option = Select.Option;


const formItemLayoutDefault = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

export const prepareInput = (values) => {
    const {letters, stage} = values;

    return {
        cancerStageElement: {
            letters,
            stage
        }
    }
}

export const CancerStageElement = (props) => {
    const {form, intl, formItemLayout=formItemLayoutDefault, stage, stageDetails={}, calculateStage} = props;
    const {getFieldDecorator} = form;
    //const {stage} = this.state;

    const {rules, letters} = stageDetails;


    const opts = [];
    letters.map(letter => {
        opts[letter] = [];
        return null;
    })
    rules.map((rule, i) => {
        const {options} = rule;

        options.map((option, i) => {
            const{id, letter, name} = option;
            opts[letter].push(letter+name);
        });
        return null;
    });

    console.log(opts);

    // format rules
    // stage and optiosn


    return (
        <React.Fragment>

            {letters.map((letter) => {
                let letterOptions = opts[letter] || [];
                // remove duplicates
                letterOptions = [...new Set(letterOptions)];
                const optionsHtml = letterOptions.map(code => {
                    return <Option key={code}>{code}</Option>
                });
                return (
                    <FormItem
                        {...formItemLayout}
                        label={letter}
                    >
                        {getFieldDecorator('letters['+letter+']', {
                                rules: [{required: true, message: "Select "+letter}],
                            }
                        )(
                            <Select onChange={calculateStage} style={{width:'100%'}}>
                                {optionsHtml}
                            </Select>
                        )}
                    </FormItem>
                )
            })}


            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.stage)}
            >
                {getFieldDecorator('stage', {
                        initialvalue:stage,
                        rules: [{required: true, message: "Enter Stage"}],
                    }
                )(
                    <Input />
                )}
            </FormItem>
        </React.Fragment>
    );
}

export const enhance = compose(
    injectIntl,
    //withState('stage', 'setStage'),
    withHandlers({
        /**
         *  Find mathces in original array and get the level
         */
        calculateStage: props => (value) => {
            // using timeout as setState using in the form is async.
            setTimeout(() => {
                const {stageDetails = {}} = props;
                const {rules, letters} = stageDetails;

                //console.log(props);
                //console.log(value);
                //console.log(props.form.getFieldsValue());
                const selectedLetters = props.form.getFieldValue('letters');
                //console.log(selectedLetters);

                // now go over all the rules and find matches
                rules.map((rule, i) => {
                    const {stage, options} = rule;
                    //console.log(stage, 'Check on stage');
                    let haveMatch = 0;
                    options.map((option, i) => {
                        const {id, letter, name} = option;

                        const code = letter + name;
                        const selectedLetter = selectedLetters[letter];
                        //console.log(selectedLetter, code);
                        //console.log(selectedLetter === code, 'Check on match');
                        if (selectedLetter === code) {
                            // if we found the match for code,

                            haveMatch++
                        }
                        //opts[letter].push(letter+''+name);
                    });
                    if (haveMatch === letters.length) {
                        // congrats - stage is found
                        //console.log('found ~Stage'+stage)
                        props.form.setFieldsValue({stage});
                    }
                    return null;
                });
            }, 0);
        },
        onSubmit: props => callback => {

            if (!props.id || props.form.isFieldsTouched()) {
                props.handleSave({prepareInput:prepareInput, callback} );
                //const valuesPrepared = props.prepareInput(values);
                //props.handleSave({prepareInput:prepareInput, callback:props.onHide} );
                //props.handleSave({input:valuesPrepared, callback} );
            } else {
                callback()
            }
        }
    })
);

export default enhance(CancerStageElement);

