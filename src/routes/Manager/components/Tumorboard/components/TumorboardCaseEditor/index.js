import React from 'react';
import {withHandlers, withState, compose} from 'recompose';
import { Row, Col, Card } from 'antd';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Timeline from '../../../../components/Profile/components/Pathway/containers/Timeline';
import TumorBoardPreview from '../../../../components/Profile/components/Tumorboard/containers/TumorBoardPreview';
import {TumorboardCaseBodyBuilder} from "./containers/TumorboardCaseBodyBuilder";

export const TumorboardCaseEditor = props => {
    const {user, tumorboard, loading, viewNote=false, caseElements=[], setCaseElements} = props;
    const span = 12;
    return <DragDropContextProvider backend={HTML5Backend}>
        <Row>
            <Col span={span} style={{marginRight:'-1px'}}>
                <Timeline userId={user.id} draggable onDrop={props.onDrop} onlyFilters />
            </Col>
            <Col span={span}>
                <TumorboardCaseBodyBuilder elements={caseElements} tumorboard={tumorboard} updateElements={setCaseElements} />
            </Col>
            {viewNote && <TumorBoardPreview element={viewNote} editable={true}  userId={user.id} onSave={props.saveElement} onCancel={props.onCancel} />}
        </Row>

    </DragDropContextProvider>
}



const enhance = compose(

    withState('viewNote', 'setViewNote', false),
    withHandlers({
        onDrop: props => (element) => {
            const {item} = element;
            props.setViewNote(item);
        },
        onCancel: props => () => {
            props.setViewNote(false);
        },
        /**
         * Save element when we drop the element and add notes
         * @param props
         */
        saveElement: props => (notes='') => {
            const {caseElements=[], viewNote:item} = props;
            const{id} = item;
            const newCaseElement = {...item, id:'', timelineId:id, notes};
            // // add element to the list of tumorboard elements
            // const tumorboardId = getTumorboardId(props);
            // props.onAndElement(tumorboard.id,id, notes);


            const newCaseElements = [...caseElements, newCaseElement];
            props.setCaseElements(newCaseElements);
            props.setViewNote(false);
        },
    }),
)

export default enhance(TumorboardCaseEditor);