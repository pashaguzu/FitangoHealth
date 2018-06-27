import React from 'react';
import {Icon, Button} from 'antd';
import {compose,withState, withHandlers} from 'recompose';
import TumorboardEditor from '../../../../containers/TumorboardEditor';

const TumorboardAddPure = ({toggleAdd, openAdd}) => {
    return <React.Fragment>
        <Button type="primary" icon="plus" onClick={toggleAdd} >Create</Button>
        {openAdd && <TumorboardEditor onHide={toggleAdd} modal />}
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
export const TumorboardAdd = enhance(TumorboardAddPure);
export default TumorboardAdd;