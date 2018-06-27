import React from 'react'
import Select from '../Select';

const DiagnosisSelectPure = ({loading, items=[], doSearch, onChange, value=undefined, codeAsId=false}) => {
    //console.log(value);
    const diagnosis = items.map(item => {
        const id = codeAsId ? item.code : item.id;
        //console.log(id);
        //console.log(item);
        return {id:id , title:item.code/*(<React.Fragment>{item.code} <div style={{fontSize:'0.8em',color:'grey'}}>{item.name}</div></React.Fragment>)*/};
    });
    //console.log(diagnosis);
    return <Select value={value} i18n={{placeholder:"Select Diagnosis"}} loading={loading} items={diagnosis} doSearch={doSearch} onChange={onChange} />;
};

export default DiagnosisSelectPure;