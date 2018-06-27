import React from 'react'
import Select from '../Select';
import {compose, withHandlers, branch, withProps} from 'recompose';

const PatientSelect = ({loading, items=[], doSearch, onChange, value=undefined, mode=null}) => {
    const people = items.map(item => {
        const {id, fullName, memberId, genderText, age} = item;
        return {id, title:fullName+' – '+genderText+' | '+age +(memberId !== '' ?  ' (#'+memberId+')': '')};
    });

    return <Select value={value} i18n={{placeholder:"Select Person"}} loading={loading} mode={mode} items={people} doSearch={doSearch} onChange={onChange} />;
};


const fullValue = compose(
    withProps(props => {
        const {value={}} = props;
        const {id} = value;
        return {value:id};
    }),
    withHandlers({
        onChange: props => value => {
            let option = props.items.filter(item => item.id === value);
            if(option.length > 0) {
                option = option[0];
            }
            //console.log(option);
            props.onChange(option);
        }
    })
)
const enhance = branch(({getFullInfo=false}) => getFullInfo,
    fullValue
);

export default enhance(PatientSelect);