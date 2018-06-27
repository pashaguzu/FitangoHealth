import React from 'react';
import {TumorboardManager} from "../../../TumorboardManager/index";
import {Button} from 'antd';
import {ModalBodyFooter} from "../../../../../../../../components/Modal/index";

export const TumorboardEditorHeader = props => {
    return <React.Fragment>
        <TumorboardManager {...props} />
        <ModalBodyFooter>
            <Button type="primary" onClick={props.goNext}>Next</Button>
        </ModalBodyFooter>
    </React.Fragment>
}

export default TumorboardEditorHeader;