import React from 'react';
import TumorboardCase from './components/TumorboardCase';
import {Card, Icon} from 'antd';
import {compose, branch, withState, withHandlers} from  'recompose';
import TumorboardCaseAdd from './components/TumorboardCase/components/TumorboardCaseAdd';
import {
    SortableContainer,
    SortableElement,
} from 'react-sortable-hoc';


const TumorboardCaseSortablePure = props => {
    return <TumorboardCase {...props}/>
}

const TumorboardCaseSortable = compose(
    branch(props => props.editable, SortableElement)
)(TumorboardCaseSortablePure);

const SortableCasesPure = props => {
    const {cases=[], editable=false, ...otherProps} = props;
    return <div>
        {cases.map((item, index) => {
            return <TumorboardCaseSortable tumorboardCase={item} key={`item-${index}`} index={index} order={index+1} editable={editable} {...otherProps} />
        })}
    </div>;
}
// make sortable
const SortableCases = compose(
    branch(props => props.editable, SortableContainer)
)(SortableCasesPure);


const TumorboardCases = props => {
    const {tumorboard={}, cases=[], editable=false, ...otherProps} = props;

    return <React.Fragment>

        <SortableCases cases={cases} editable={editable} onSortEnd={props.onSortEnd} useDragHandle={editable}  {...otherProps}  />

        {editable && <div style={{marginTop:20}}><TumorboardCaseAdd tumorboard={tumorboard} onFinish={props.onCaseAdd} /></div>}
    </React.Fragment>
}


export default TumorboardCases;