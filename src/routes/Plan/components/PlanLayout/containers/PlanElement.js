import React from 'react';
import PlanElement from '../components/PlanElement';
import {List} from 'antd';



//import Plan from '../../../../Plan/components/Plan';
export default PlanElement;



//export default PlanElementWithMutation(PlanElement);



export const PlanElementListItem = (props) => {
    const {i, planId, item, isPreviewMode, isBuilderMode, isDraggable, mode, schedule=false, lessonId, sectionId} = props;
    //console.log(props);
    return <List.Item
        key={item.id}
    >
        <PlanElement i={i} planId={planId} isDraggable={isDraggable} element={item} mode={mode} isPreviewMode={isPreviewMode}
                     isBuilderMode={isBuilderMode} schedule={schedule} lessonId={lessonId} sectionId={sectionId}/>
    </List.Item>;
}