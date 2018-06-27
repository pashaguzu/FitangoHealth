import React from 'react';
import {compose, withProps} from 'recompose';
import TumorboardCases from '../../../TumorboardView/containers/TumorboardCases';
import {Button} from 'antd';
import {ModalBodyFooter} from "../../../../../../../../components/Modal/index";

const TumorboardEditorCase = props => {
    return <React.Fragment>
        <TumorboardCases {...props} editable />
        <ModalBodyFooter>
            <Button onClick={props.goPrev}>Previous</Button> <Button type="primary" onClick={props.goNext}>Next</Button>
        </ModalBodyFooter>
    </React.Fragment>
}




export default TumorboardEditorCase;