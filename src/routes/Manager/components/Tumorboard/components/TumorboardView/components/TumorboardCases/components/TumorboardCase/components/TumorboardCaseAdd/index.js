import React from 'react';
import {Icon, Button} from 'antd';
import {compose,withState, withHandlers} from 'recompose';
import TumorboardCaseEditor from "../../../../../../../../containers/TumorboardCaseEditor";

const TumorboardCaseAddPure = ({toggleAdd, openAdd, tumorboardCase, tumorboard, onFinish}) => {
    return <React.Fragment>
            <Button type="dashed" onClick={toggleAdd} style={{textAlign:'center', width: '100%' }}>
            <Icon type="plus"  /> Add Case
            </Button>
        {openAdd && <TumorboardCaseEditor onHide={toggleAdd} onFinish={onFinish} modal tumorboard={tumorboard} tumorboardCase={tumorboardCase} />}
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
export const TumorboardCaseAdd = enhance(TumorboardCaseAddPure);
export default TumorboardCaseAdd;