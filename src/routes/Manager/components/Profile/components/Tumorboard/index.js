import React from 'react';
import { Row, Col, Card } from 'antd';
import PanelGroup from 'react-panelgroup';
import moment from 'moment';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Timeline from '../../components/Pathway/containers/Timeline';
import TumorboardSide from './containers/TumorboardSide';
import TumorBoardPreview from './containers/TumorBoardPreview';
import {compose, withHandlers, withState} from 'recompose';
//import PathwayContent from './containers/PathwayContent';
//import TimelineElementDetails from '../../components/Pathway/components/Timeline/containers/TimelineElementDetails'

const Tumorboard = props => {
    const {user, tumorboard, loading, viewNote=false} = props;
    const span = 12;
    return <DragDropContextProvider backend={HTML5Backend}>
        <Row>
            <Col span={span} style={{marginRight:'-1px'}}>
                <Timeline userId={user.id} draggable onDrop={props.onDrop} filters={['tumorboard']} onlyFilters /*togglePathway={this.togglePathway} showPathway={showPathway}   showElement={this.toggleElementView} activeElement={activeElement}*/ />
            </Col>
            <Col span={span}>
                <TumorboardSide setTumorboard={props.setTumorboard} userId={user.id} tumorboard={tumorboard} loading={loading} /*pathway={this.state.pathway} setPathway={this.setPathway}*/ />
            </Col>
            {viewNote && <TumorBoardPreview element={viewNote}  userId={user.id} onSave={props.saveElement} onCancel={props.onCancel} />}
        </Row>

    </DragDropContextProvider>
}


const getTumorboardId = props => {
    console.log(props,'getTumorboardId');
    //const {tumorboard_tmp={id:''}} = props;
    const {tumorboard={id:''}} = props;

    return tumorboard.id;// !== '' ? tumorboard.id : tumorboard_tmp.id;
}

const enhance = compose(
    withState('viewNote', 'setViewNote', false),// 0 - means the first item
    withHandlers({
        onDrop: props => (element) => {
            // show the modal with notes
            //console.log(props, 'Drop');
            //console.log(element, 'Drop');
            const {item} = element;
            //const {id} = item;
            // add element to the list of tumorboard elements
            //const tumorboardId = getTumorboardId(props);
            //props.onAndElement(tumorboardId,id);
            props.setViewNote(item);
        },
        onCancel: props => () => {
            props.setViewNote(false);
        },
        saveElement: props => (notes='') => {
            // show the modal with notes
            //console.log(props, 'Drop');
            //console.log(element, 'Drop');
            const item = props.viewNote;
            const {id} = item;
            // add element to the list of tumorboard elements
            const tumorboardId = getTumorboardId(props);
            props.onAndElement(tumorboardId,id, notes);
            props.setViewNote(false);
        },
    }),
)

export default enhance(Tumorboard);