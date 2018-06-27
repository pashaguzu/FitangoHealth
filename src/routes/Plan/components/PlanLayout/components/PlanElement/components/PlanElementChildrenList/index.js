import React from 'react'
import {Card, List, Button, Modal, Divider} from 'antd';
import {withState, withHandlers, compose} from 'recompose';
import PlanElementChildrenElement from './containers/PlanElementChildrenElement';
import PlanElement from "../../../../components/PlanElement";
import PlanElementChildrenSelect from './components/PlanElementChildrenSelect';
import {EmptyList} from "../../../../../../../../components/Loading/index";



const PlanElementChildrenList = (props) => {
    //console.log(props);
    const {elementId, elementValue, elements=[], isDraggable, onDrop, isBuilderMode, isPreviewMode, planId, mode, loading} = props;
    return (<React.Fragment>

        {/*isBuilderMode && <PlanElementChildrenSelect mode={mode} planId={planId} parentId={elementId} parentValue={elementValue} onHide={props.onHide} onElementAdd={props.onElementAdd} />*/}
        {elements.length > 0 ?
            <List
                size="large"
                itemLayout="vertical"
                split={false}
                dataSource={elements}
                renderItem={(item, i) => {
                    return <List.Item
                        id={'field' + item.id}
                        key={item.id}>
                        <PlanElementChildrenElement i={i} isDraggable={isDraggable} onDrop={onDrop} element={item} planId={planId} mode={mode} isBuilderMode={isBuilderMode}
                                                    parentId={elementId} parentValue={elementValue}
                                                     isPreviewMode={isPreviewMode}
                        />

                    </List.Item>
                }}
            />
            : <EmptyList>{loading ? 'Loading...' :  ''}</EmptyList>
        }

        {(!loading && elements.length === 0 && isBuilderMode && !isPreviewMode) && <Divider><AddChildrenButton {...props} /></Divider>}
    </React.Fragment>)
}

export default PlanElementChildrenList;



const AddChildrenButtonPure = props => {
    const {elementId, elementValue, elements=[], isDraggable, onDrop, isBuilderMode, isPreviewMode, planId, mode, loading} = props;
    return <React.Fragment>
        {props.showModal && <Modal title="Select Element" visible={true} onOk={props.toggleModal} onCancel={props.toggleModal}>
            <PlanElementChildrenSelect mode={mode} planId={planId} parentId={elementId} parentValue={elementValue} onHide={props.hideModal} onElementAdd={props.onElementAdd} />
        </Modal>}
        <Button onClick={props.toggleModal}>Add First Element</Button>
    </React.Fragment>
}

const AddChildrenButton = compose(
    withState('showModal', 'setShowModal', false),
    withHandlers({
        toggleModal: props => () => {
            props.setShowModal(!props.showModal);
        },
        hideModal: props => () => {
            props.setShowModal(false);
        }
    })
)(AddChildrenButtonPure);
