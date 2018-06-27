import React from 'react';
import {Icon, List, Checkbox} from 'antd';
import TreatmentBlockManageOptionModal from '../../containers/TreatmentBlockManageOptionModal';
import {getTreatmentElementLabel} from "../TreatmentBlockOptionSelect/index";

const TreatmentBlockOption = ({planId, treatmentId, blockId, details, onEdit, onDelete, showEditModal, onHide, mode}) => {
    const {id, type, description} = details;
    return <List.Item actions={[<Icon type="edit" onClick={onEdit} />, <Icon type="delete" onClick={onDelete} />]}>
        <List.Item.Meta
            avatar={<Checkbox />}
            title={getTreatmentElementLabel(details)}
            description={description}
        />
    </List.Item>;
}

export default TreatmentBlockOption;