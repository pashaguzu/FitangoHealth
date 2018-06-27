import React from 'react';
import {Form, Input, Mention, Button} from 'antd';
import {compose, withProps, withHandlers, withState} from 'recompose';
import './index.less';
const { toString, toContentState, getMentions, Nav } = Mention;

const Formula = props => {
    const {formula, loading, suggestions, onChange} = props;
    return <Mention
        loading={loading}
        notFoundContent="No Trackers found"
        suggestions={suggestions}

        value={formula}
        onChange={onChange}

        //onChange={validateFormula}
        //onSearchChange={onSearchChange}
    />
}


const enhance = compose(
    withState('formula', 'setFormula', props => props.value),
    withHandlers({
        onChange: props => value => {
            const {suggestions} = props;

            //console.log(suggestions);
            //console.log();
            const mentions = getMentions(value);// mentions with @
            let trackers = [];
            mentions.map(mention => {
                const items = suggestions.map(suggestion => {
                    const tracker = suggestion.props.data;
                    const {label=''} = tracker;
                    const code = label.split(' ').join('_');
                    //console.log(mention);
                    //console.log(code);
                    if (mention === '@'+code) {
                        trackers.push(tracker.id);
                    }
                    return null;
                    //console.log(tracker);
                    //return ;
                });
                //console.log(items);
                if (items.length > 0) {
                    return items[0];
                }
                return null;
            });
            //console.log(trackers);
            props.onChange(value);
            props.form.setFieldsValue({trackers});
            props.setFormula(value);



            //
            // console.log(toString(value));
            // const formula = formatFormula(toString(value));
            // const state = toContentState(formula);
            // console.log(toString(value));
            // console.log(formula);
            // console.log(toString(state));
            // //props.setFormula(toContentState(formula));
            // //props.setFormula(toContentState('@afc163'));
            // //console.log(formula);
            // console.log(value);
            // console.log(props);
            // //props.onChange(formula);
        }
    })
)

export default enhance(Formula);

export const formatFormula = formula => {
    if (!formula || formula === '') {
        return formula;
    }
    //console.log(formula);
    let x = formula;
    const separators = ['+', '-', '(', ')', '*', '/', '^'];
    for (var i = 0; i < separators.length; i++) {
        var rg = new RegExp("\\" + separators[i], "g");
        x = x.replace(rg, " " + separators[i] + " ");
    }
    x = x.split('  ').join(' ');// remove double spaces
    return x;
}