import React from 'react';
import {Icon, List} from 'antd';
import TreatmentBlockManageOptionModal from '../../containers/TreatmentBlockManageOptionModal';

const TreatmentBlockOption = ({planId, treatmentId, blockId, details, onEdit, onDelete, showEditModal, onHide, mode}) => {
    const {id, type, description} = details;
    return <List.Item actions={[<Icon type="edit" onClick={onEdit} />, <Icon type="delete" onClick={onDelete} />]}>
        <List.Item.Meta
            title={type}
            description={description}
        />
        {showEditModal && <TreatmentBlockManageOptionModal id={id} planId={planId} type={type} mode={mode} treatmentId={treatmentId} blockId={blockId} onHide={onHide}  />}
    </List.Item>;
}

export default TreatmentBlockOption;