import React from 'react';
import PlanElementBox from './containers/PlanElementBox';
import PlanElementChildrenList from './containers/PlanElementChildrenList';
//import VisibilitySensor from 'react-visibility-sensor';
import { compose, withProps, branch, withHandlers , defaultProps, withState} from 'recompose';


const PlanElement = (props) => {
    //console.log(props);
    const {i,element, date, isDraggable, onDrop, isBuilderMode, isPreviewMode, planId, upid, schedule, mode} = props;
    const {id,itemType, type, itemInfo, reports, hasChildren=false} = element;
    return (
        <React.Fragment>
            <PlanElementBox {...props} showChildren={props.setShowChildren} /*showAlias={props.setShowAlias}*/ />

            {(props.showChildren) && <div style={{padding:20, paddingRight:0, background: '#fbfbfb', border: '1px solid #e8e8e8',
                borderTop:'none'}} ><PlanElementChildrenList elementId={id} onDrop={onDrop} planId={planId} isDraggable={isDraggable} isPreviewMode={isPreviewMode} isBuilderMode={isBuilderMode} mode={mode} elementValue={props.elementValue}  /></div>}
        </React.Fragment>
        )
}







// // Scrollable
// const withAutoScroll = (Component) => {
//     const onChange = isVisible => {
//     console.log(isVisible);
//     }
//
//     const Autoscroll = props => (
//             <VisibilitySensor onChange={onChange}>
//                 <Component {...props} />
//             </VisibilitySensor>
//     )
//
//     return Autoscroll
// }


const enhance = compose(
    defaultProps({
        isDraggable:false
    }),
    withState('showChildren', 'setShowChildren', false),
    withState('showAlias', 'setShowAlias', false),
    withState('elementValue', 'setElementValue', ''),
    withHandlers({
        setShowChildren: props => (value) => {
            props.setShowChildren(true);
            props.setElementValue(value);
        }
    }),
    //branch(props => props.isDraggable, withAutoScroll )//
);


export default enhance(PlanElement);




