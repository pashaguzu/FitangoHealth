import React from 'react'
import PropTypes from 'prop-types'
import {Row, Col,Card} from 'antd';
import './index.less';
import {AttachmentsList} from "../../../../../../components/FormCustomFields/components/Attachments/index";


export const ClinicalNoteElement = props => {
    const {item={}, isBuilderMode=false, cardOpts={}} = props;
    const {title, note = '', attachments=[]} = item;
    return  <React.Fragment>
        <Row>
            <Col >{note}</Col>
            {attachments.length > 0 && <Col><Card type="pure" bordered={false} style={{marginTop:10}}><AttachmentsList attachments={attachments} isEditable={isBuilderMode}  /></Card></Col>}
        </Row>
        </React.Fragment>;
}
export default ClinicalNoteElement;