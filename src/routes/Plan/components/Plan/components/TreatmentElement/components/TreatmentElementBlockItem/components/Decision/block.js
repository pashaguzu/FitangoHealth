import React from 'react';
import Decision from './index';
import PlanElementChildrenList from '../../../../../../../../../../components/PlanLayout/components/PlanElement/containers/PlanElementChildrenList'


const DecisionBlock = (props) => {
    console.log(props);
    const {elementId, showChildren, mode, isPreviewMode, planId} = props;
    return (<React.Fragment>
        <Decision {...props} />
        {showChildren && <div><PlanElementChildrenList elementId={elementId}  planId={planId} isPreviewMode={isPreviewMode} mode={mode} elementValue={showChildren} /></div>}
    </React.Fragment>)
}

export default DecisionBlock;