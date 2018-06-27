import React from 'react'
import PropTypes from 'prop-types'
import {List, Icon, Card, Checkbox, Popover} from 'antd';
import TreatmentElementBlockItem from '../TreatmentElementBlockItem';
import TreatmentBlockManageOptionModal from '../../../../../PlanLayout/components/PlanElementBuilder/components/TreatmentElementBuilder/containers/TreatmentBlockManageOptionModal';
import {getTreatmentElementLabel} from "../../../../../PlanLayout/components/PlanElementBuilder/components/TreatmentElementBuilder/components/TreatmentBlockOptionSelect/index";

const TreatmentElementBlock = ({i, planId, option, isPreviewMode, mode, treatmentId, isBuilderMode=false, onEdit, onDelete, onHide, showEditModal=false, onElementUpdate, handleReport=false}) => {
    const haveNote = option.notes || false;
    //console.log(option);
    const content = (
        <div>
            {option.notes || ''}
        </div>
    );
    //console.log(getTreatmentElementLabel(option));
    //form.getFieldDecorator(`elements`, {initialValue: []});

    return <List.Item  className="full-width" actions={isBuilderMode && [<Icon type="edit" onClick={onEdit} />, <Icon type="delete" onClick={onDelete} />]}
    >
        <List.Item.Meta
            avatar={<Checkbox disabled={isBuilderMode} />}
            title={getTreatmentElementLabel(option)}
            description={<React.Fragment>

                <TreatmentElementBlockItem planId={planId} treatmentId={treatmentId} isPreviewMode={isPreviewMode} mode={mode} details={option} />
                {haveNote && <div>{option.notes}</div>/*<div><Popover content={content} title="Notes" trigger="hover"><Icon type="file" style={{marginLeft:5}} /></Popover></div>*/}
            </React.Fragment>
            }
        />
        {showEditModal && <TreatmentBlockManageOptionModal i={i} onElementUpdate={onElementUpdate} treatmentId={treatmentId} details={option} id={option.id} planId={planId} type={option.type} mode={mode} onHide={onHide}  />}

    </List.Item>

}
export default TreatmentElementBlock;