import React from 'react';
import {Card, Tag, Button} from 'antd';
import {compose, withState, withHandlers} from 'recompose';
import { DropTarget } from 'react-dnd';
import {TimelineElementView} from "../../../../../Pathway/components/Timeline/components/TimelineElement/index";
import {TumorboardElements} from "../../../../../../../Tumorboard/components/TumorboardView/components/TumorboardElements/index";
import {EmptyList} from "../../../../../../../../../../components/Loading/index";

const TumorBoardBodyBuilderPure = props => {
    const {canDrop, isOver, connectDropTarget, tumorboard ={}, userId, loading=false} = props;
    const isActive = canDrop && isOver;
    const {elements=[]} = tumorboard;
    //console.log(props);
    return <Card type="pure" bordered={false} bodyStyle={{overflowY:'auto', height:'100vh', 'marginTop':1}}>

                 {canDrop && <div style={{position:'absolute', top:0, left:0, height:'100%', background: '#fff', opacity:'0.7', 'width':'100%', zIndex:999, paddingTop:'20%'}}><center><Tag color="#87d068">{isActive ? 'Release to drop' : 'Drag a box here'}</Tag></center></div>}

        {elements.length > 0 ?
        <TumorboardElements tumorboard={tumorboard} elements={elements} editable={true} userId={userId} loading={loading} />
            : <EmptyList>Please reset timeline filter and drag elements here</EmptyList>}

        <div style={{textAlign:'right', marginTop:10}}>
        <Button type="primary" onClick={props.doPublish}>Publish</Button>
        </div>
</Card>;
}






const droppableTumorBoardBodyBuilderPure = props => {
    const {connectDropTarget} = props;
    //const isActive = canDrop && isOver;
    return connectDropTarget(<div><TumorBoardBodyBuilderPure {...props} /></div>);
}

const boxTarget = {
    drop() {
        return { name: 'tumorboard' }
    },
}


const enhance = compose(
    DropTarget('box', boxTarget, (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    })),
    withHandlers({
        doPublish: props => value => {
            props.setStep(2);
        }
    })
);


export default enhance(droppableTumorBoardBodyBuilderPure);