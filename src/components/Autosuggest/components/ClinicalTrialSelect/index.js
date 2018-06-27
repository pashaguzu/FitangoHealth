import React from 'react'
import {compose, withHandlers} from 'recompose';
import Select from '../Select';

const ClinicalTrialSelect = ({loading, items, doSearch, onChange, value=undefined}) => {
    return <Select value={value} i18n={{placeholder:"Select Clinical Trial"}} loading={loading} items={items} doSearch={doSearch} onChange={onChange} />;
};


const enhance = compose(
    // withHandlers({
    //     onChange: props => value => {
    //         let option = props.items.filter(item => item.id === value);
    //         if(option.length > 0) {
    //             option = option[0];
    //         }
    //         props.onChange(value, option);
    //     }
    // })
);

export default enhance(ClinicalTrialSelect);