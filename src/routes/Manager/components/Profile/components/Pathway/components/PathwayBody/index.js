import React from 'react';
import {Row, Col, List} from 'antd';
import {Loading} from "../../../../../../../../components/Loading/index";
import PathwayBodyElement from "./components/PathwayBodyElement";
import TimelineElementModal from "../../components/Timeline/containers/TimelineElementModal";
import {compose, withState, withHandlers, withProps} from 'recompose';
import {withSpinnerWhileLoading} from "../../../../../../../Modal/components/index";



const TimelineElementModalSingle = props => {
    //console.log(props);
    return <TimelineElementModal {...props} onHide={() => props.removeElement(props.element.id)}/>;

}

const TimelineElementModalEnhanced = compose(
    // withState('elements', 'setElements', (props => {
    //     const {elements=[]} = props;
    //     console.log(props,'ELEMENRS');
    //     return elements;
    // })),
    withHandlers({
        removeElement: props => value => {
            const elements = props.elements.filter(element => element.id !== value);
            //console.log(props, 'Remove element');
            //console.log(elements, 'Remove element');
            props.setTimelineElementToAdd({elements});
            if (elements.length === 0) {
                props.onHide();
            }
        }
    })
)(props => {
    const {elements = []} = props;
    // if we have multiple elements - we need to show tabs for every element
    //console.log(props);
    if (elements.length > 0) {
        return elements.map(element => <TimelineElementModalSingle {...props} element={element}/>);
    }
    return <TimelineElementModal {...props} />;
});


const PathwayBody = props => {
    const {userId, pathway = {}, timelineElementToAdd: element, onHide, onDrop, currentInOrder, i, setTimelineElementToAdd} = props;
    const {elements, id} = pathway;

    return (<Row>
        {props.openTimelineModal &&
        <TimelineElementModalEnhanced userId={userId} setTimelineElementToAdd={setTimelineElementToAdd} pathway={pathway} {...element} onHide={onHide}/>}
        {elements ?
            <Col>
                <List
                    size="small"
                    itemLayout="vertical"
                    split={false}
                    dataSource={elements}
                    renderItem={(item, i) => {
                        return <List.Item
                            id={'field' + item.id}
                            key={item.id}>
                            <PathwayBodyElement planId={id} i={i} currentInOrder={currentInOrder} element={item}
                                                onDrop={onDrop}/>
                        </List.Item>
                    }}
                /></Col>
            : <Col>
                <div className="ant-list-empty-text"> No Pathway content</div>
            </Col>}
    </Row>)
}


const enhance = compose(
    withSpinnerWhileLoading,
    withState('openTimelineModal', 'setOpenTimelineModal', false),
    withState('timelineElementToAdd', 'setTimelineElementToAdd', null),
    withHandlers({
        onDrop: props => (element) => {
            console.log(props, 'Drop');
            props.setOpenTimelineModal(true);
            props.setTimelineElementToAdd(element);

            let currentInOrder = parseInt(props.currentInOrder);
            props.setCurrentInOrder(currentInOrder+1);
        },
        onHide: props => () => {
            props.setOpenTimelineModal(false);
            props.setTimelineElementToAdd(null);
            if (props.setOpenElement) {
                props.setOpenElement(false);
            }
        }
    }),
    withProps(props => {
        const {loading, openElement = false, openTimelineModal, timelineElementToAdd} = props;
        //console.log(props);
        if (!loading && openElement && !openTimelineModal && timelineElementToAdd === null) {
            const {currentInOrder, pathway: {elements = []}} = props;
            //console.log(props);
            //console.log(elements);
            // find needed element
            const currentElements = elements.filter((element, i) => i === currentInOrder);
            //let element = null;
            if (currentElements.length > 0) {
                //element = .itemInfo;
                //console.log(currentElements[0]);
                props.onDrop({element: currentElements[0]});

                //props.setOpenElement(false);
            }
            /* console.log(element);
             return {
                 element
             }*/
        }
    }),
    //branch(props => props.openElement, renderComponent(TimelineElementModal))
)
//       openElement, setOpenElement
//     <TimelineElementModal userId={userId} pathway={pathway} {...element} onHide={this.onHide} />
// }

export default enhance(PathwayBody);