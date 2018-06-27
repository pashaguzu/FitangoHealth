import React from 'react';
import {compose,withStateHandlers} from 'recompose';
import Search from './index'
const enhance = compose(
    withStateHandlers(
        (props) => (
            {
            searchText: '',
            objCustom:props.obj
        }),
        {        
            onSearch: ({searchText,objCustom}) =>(value) => (
                {
                    searchText: value.target.value,
                    providers: objCustom.map((record) => {
                        const match = record.provider.name.match(new RegExp(searchText, 'gi'));
                        if (!match) {
                            return null;
                        }                        
                        return {
                            ...record,
                            name: (
                                <span>
                      {record.provider.name.split( new RegExp(searchText, 'gi')).map((text, i) => (
                      i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                      ))}
                    </span>
                            ),
                        };
                    }).filter(record => !!record),
            }),
            emitEmpty: ({searchText}) =>(value) => (
                {
                    searchText: ''
                     })
            })        

);
export default enhance(Search);