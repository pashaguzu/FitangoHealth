import React from 'react';
import {Card, Badge, Tooltip, Icon, message} from 'antd';
import {SortableContainer, SortableElement, arrayMove, SortableHandle} from 'react-sortable-hoc';
import {defaultProps, branch,compose, withState, withHandlers, lifecycle, withProps} from 'recompose';
import {TimelineElementView} from "../../../../../Profile/components/Pathway/components/Timeline/components/TimelineElement/index";
import {CardComments} from "../../../../../../../../components/Card/components/CardComments/index";
import {withSpinnerWhileLoading} from "../../../../../../../../components/Modal/index";
import {withUpdateOrderMutation} from "./mutation";
const DragHandle = SortableHandle(() => <Tooltip title="Sort"><span className="sorter-handler"></span></Tooltip>);


const TumorboardElementCardPure = props => {
    const {element, i=0, userId, editable} = props;
    const {id, notes=''} = element;
    const showComments = false;// !editable && typeof i === 'number';
    const {body, color, activityText, image, icon, progress, title} = TimelineElementView(element);
    return <Card title={<React.Fragment>{i >= 0 && <Badge count={i >= 0 && (i+1)} style={{ backgroundColor: '#52c41a' }}  />} {title}</React.Fragment>}
                 key={i}
    extra={(editable ? <DragHandle /> : undefined)}
    >
        {activityText}
        {notes !== '' && <div className="ant-card-notes">{notes}</div>}
        {showComments &&  <CardComments id={id} type="tumorboard_el" title="Comments" userId={userId} />}
        </Card>;
}

const enhanceItem = compose(
    branch(props => props.editable, SortableElement)
);

export const TumorboardElementCard = enhanceItem(TumorboardElementCardPure);






const TumorboardElementsPure = props => {
    const {elements=[], userId, editable} = props;
    console.log(elements);
    return <div>{elements.map((element, i) => {
        return <TumorboardElementCard element={element} key={`item-${i}`} index={i} i={i} userId={userId} editable={editable} />
    })}</div>;
};



const derivedStateFromProps = (initialState, updateStateValue) => BaseComponent => {
    class DerivedStateFromProps extends React.Component {
        state = typeof initialState === 'string' ? this.props[initialState] : initialState;
        static getDerivedStateFromProps = updateStateValue;
        render() {
            return <BaseComponent {...this.props} {...this.state} />;
        };
    }
    return DerivedStateFromProps;
}

const enhance = compose(
    withSpinnerWhileLoading,
    defaultProps({
        useDragHandle:true
    }),
    //branch(props => props.editable, withUpdateOrderMutation),
    //withState('elements_sortable', 'setElements', props => props.elements),
    withHandlers({
        onSortEnd: props => ({oldIndex, newIndex}) => {
            //console.log(props);
            const newOrder = arrayMove(props.elements, oldIndex, newIndex);
            props.updateElements(newOrder);
            // save elements order
            // props.updateOrder(newOrder.map(element => element.id)).then(() => {
            //     message.success('Updated');
            // });
        }
    }),
    lifecycle({
        // getDerivedStateFromProps(nextProps, prevState){
        //     console.log(nextProps);
        //     console.log(prevState);
        //     // if (this.state.visible === true && newProps.visible === false) {
        //     //     registerLog('dialog is hidden');
        //     // }
        //     return {
        //         elements : nextProps.elements
        //     };
        // },

        // componentWillReceiveProps(nextProps) {
        //     //console.log(nextProps.elements,'ELEMENTS');
        //     //console.log(this.props.elements);
        //     if (this.props.elements !== nextProps.elements)
        //         this.props.updateElements(nextProps.elements);
        // }
    }),
    withProps(props => {
        const {elements_sortable=[]} = props;
        return {
            //elements:elements_sortable,
            lockAxis:'y',
            lockToContainerEdges:true,
            hideSortableGhost:false
        }
    }),
    SortableContainer,
    // derivedStateFromProps((nextProps, prevState) => {
    //     console.log(nextProps);
    //     console.log(prevState);
    //     // if (this.state.visible === true && newProps.visible === false) {
    //     //     registerLog('dialog is hidden');
    //     // }
    //
    //
    //     if (nextProps.elements !== prevState.elements) {
    //         return {
    //             elements : nextProps.elements
    //         };
    //     }
    //     return null;
    // }),


);

export const TumorboardElements = enhance(TumorboardElementsPure);