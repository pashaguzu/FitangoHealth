import React from 'react';
import {Icon} from 'antd';
import {compose,withState, withHandlers} from 'recompose';
import TumorboardEditor from '../../../../containers/TumorboardEditor';

const TumorboardEditPure = ({toggleAdd, openAdd, tumorboard}) => {
    return <React.Fragment>
        <Icon type="edit" onClick={toggleAdd} />
        {openAdd && <TumorboardEditor onHide={toggleAdd} modal tumorboard={tumorboard} />}
    </React.Fragment>
}

const enhance = compose(
    withState('openAdd', 'setOpenAdd', false),
    withHandlers({
        toggleAdd: props => () => {
            props.setOpenAdd(!props.openAdd);
        }
    })
);
export const TumorboardEdit = enhance(TumorboardEditPure);
export default TumorboardEdit;