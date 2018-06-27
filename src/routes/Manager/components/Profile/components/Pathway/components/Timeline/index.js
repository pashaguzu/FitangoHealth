import React from 'react';
import { Timeline as TimelineAnt, Tag, Card, Button, Tooltip, Icon, Popover, Affix } from 'antd';
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import {compose, branch, renderComponent, withStateHandlers, defaultProps} from 'recompose';
import TimelineElementModal from './containers/TimelineElementModal';
import TimelineElement from './components/TimelineElement';
import TimelineFilter from './containers/TimelineFilter';
import {EmptyList} from "../../../../../../../../components/Loading/index";
import TimelineElementSelectAdd from "./components/TimelineElementSelectAdd/index";



const TimelinePure = props => {
    const {onlyFilters=false,droppable=false, draggable=false, canDrop=false, isOver=false, items =[], userId, showElement, activeElement, } = props;
    const isActive = canDrop && isOver;
    const {filters=null, showFilters=false} = props;
    const {togglePathway, showPathway, onDrop} = props;
    console.log(props, 'TimelinePure');
    let extra = '';
    if (onlyFilters) {
        extra = <React.Fragment>
            <Tooltip title={"Filter"} >
                <Button icon="filter" size={'small'} type={showFilters ? "primary": '' } ghost={showFilters} onClick={props.toggleFilter} shape="circle" /></Tooltip></React.Fragment>
    } else {
        extra = <React.Fragment>
            <Tooltip title={"Filter"} >
                <Button icon="filter" size={'small'} type={showFilters ? "primary": '' } ghost={showFilters} onClick={props.toggleFilter} shape="circle" /></Tooltip> <TimelineElementSelectAdd onSelect={props.onSelectElement} /> <Tooltip title={showPathway ? "Hide Pathway": "Show Pathway" }><Button size={'small'} type={showPathway ? "primary": '' } ghost={showPathway} onClick={togglePathway} shape="circle" >P</Button></Tooltip></React.Fragment>;
    }

    return <div>
        {props.openAddElement && <TimelineElementModal userId={userId} type={props.elementType} onHide={props.hideTimelineElement} />}
        <Card title="Timeline" bodyStyle={{overflowY:'auto',background:(canDrop ? '#f6ffed':'transparent'), height:'100vh', backgroundColor:'#f9f9f9', 'marginTop':1}}
              extra={extra}
        >
            {showFilters && <TimelineFilter filters={filters} updateFilters={props.updateFilters} loadFiltered={props.loadFiltered} toggleFilter={props.toggleFilter} />}

            {canDrop && <div style={{position:'absolute', top:0, left:0, height:'100%', background: '#fff', opacity:'0.7', 'width':'100%', zIndex:999, paddingTop:'20%'}}><center><Tag color="#87d068">{isActive ? 'Release to drop' : 'Drag a box here'}</Tag></center></div>}

            {!filters || filters.length > 0 ?
                <div>
                    {items.map((item, i) => <TimelineElement key={i} item={item} userId={userId} showElement={showElement} activeElement={activeElement} draggable={draggable} onDrop={onDrop} />)}
                </div>
                :
                <EmptyList>Please filter at lease one parameter</EmptyList>
            }
        </Card></div>;
}
const enhanceTimeline = compose(
    defaultProps({
        droppable:false,
        items: [],
        totalCount:0,
        endCursor:'',
        hasMore:false
    }),
    withStateHandlers((props => {
        const {filters} = props;
       // console.log(props);
        return {
            openAddElement:false,
            elementType:'',
            filters,
            showFilters:false
        }
    }),{
        toggleFilter: props => () => {
            return {showFilters:!props.showFilters}
        },
        updateFilters: props => (filters) => {
            return {filters}
        },

        hideTimelineElement: props => () => {
            return {openAddElement:false, elementType:''}
        },

        onSelectElement: props => (type) => {
            return {openAddElement:true, elementType:type}
        }
    })
);

const Timeline = enhanceTimeline(TimelinePure);





const droppableTimelinePure = props => {
    const {connectDropTarget} = props;
    //const isActive = canDrop && isOver;
    return connectDropTarget(<div><Timeline {...props} /></div>);
}

const boxTarget = {
    drop() {
        return { name: 'Timeline' }
    },
}

const droppableTimeline =  DropTarget('box', boxTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
}))(droppableTimelinePure);



const enhance = compose(
    branch(props => props.droppable, renderComponent(droppableTimeline)),
);

export default enhance(Timeline);
