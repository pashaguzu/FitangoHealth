import React from 'react'

import PathwayElements from '../../../../../../Plan/components/PlanLayout/components/PathwayBody';

export class BuildBody extends React.Component {

    static defaultProps = {
        isBuilderMode:true,
        elements:[],
        planId:''
    }
    render() {
        const {elements, planId, isBuilderMode} = this.props;
        return (<PathwayElements {...this.props} isBuilderMode mode='pathway' />
        )
    }
}



export default BuildBody
