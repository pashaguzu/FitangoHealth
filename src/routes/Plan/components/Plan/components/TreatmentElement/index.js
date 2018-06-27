import React from 'react'
import PropTypes from 'prop-types'
import {Card, Divider,List} from 'antd';
import TreatmentElementBlock from './components/TreatmentElementBlock';
import './index.less';

const TreatmentElement = ({item, planId, isPreviewMode, isBuilderMode, mode, handleReport=false}) => {
    const {elements} = item;
        return <List
            size="small"
            type="horizontal"
            dataSource={elements}
            renderItem={(option, i) => (
                <TreatmentElementBlock key={i} planId={planId} handleReport={handleReport} isPreviewMode={isPreviewMode} isBuilderMode={isBuilderMode} mode={mode} option={option} />
            )}
        />
}
export default TreatmentElement;