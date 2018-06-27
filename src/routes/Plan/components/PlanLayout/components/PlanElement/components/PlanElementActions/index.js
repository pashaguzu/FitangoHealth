import React from 'react'
import PropTypes from 'prop-types';
import {
    SortableHandle,
} from 'react-sortable-hoc';
import PlanElementBuilder from '../../../../containers/PlanElementBuilder';
import {Icon, Tooltip, Modal} from 'antd';
import './index.less'
import PlanElementsSelectbox from '../../../../components/PlanElementsSelectbox';


const DragHandle = SortableHandle(() => <Tooltip title="Sort"><span className="sorter-handler"></span></Tooltip>);


const PlanElementActions = (props) => {
    //console.log(props);
    let {order = null, openEditElement, toggleEditElement, deleteElement, addAfterElement, hideOrder, buttons=[]} = props;
    // let button =
    console.log(props);
    if (order !== null ) {
        return <React.Fragment>
            <Modal title="Select Element" visible={true} footer={false} onCancel={hideOrder}><PlanElementsSelectbox {...props} id="" type="" onHide={hideOrder} /></Modal>
            {openEditElement && <PlanElementBuilder {...props} onHide={toggleEditElement} />}
        </React.Fragment>
    } else if (openEditElement) {
        return <PlanElementBuilder {...props} onHide={toggleEditElement} />;
    }
    if (buttons.length > 0) {
        return buttons.map((button, i) => {
            switch(button) {
                case 'addBefore':
                    return <React.Fragment key={i}>
                        <Tooltip key={i} title="Add First Element" onClick={props.addBeforeElement} ><Icon type="plus" /></Tooltip>
                    </React.Fragment>
                    break;
                case 'addAfter':
                    return <React.Fragment key={i}>
                        <Tooltip key={i} title="Add Element Here" onClick={props.addAfterElement} ><Icon type="plus" /></Tooltip>
                    </React.Fragment>
                    break;
            }
        })
    }
    return (<div>
        <DragHandle /> <Tooltip title="Edit"><Icon type="edit" onClick={toggleEditElement} style={{marginRight:5}} /></Tooltip> <Tooltip title="Delete"><Icon type="delete" onClick={deleteElement} /></Tooltip>
    </div>)

}

export default PlanElementActions;
