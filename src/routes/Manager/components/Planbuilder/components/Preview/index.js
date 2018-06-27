import React from 'react'
import PlanBody from '../../containers/BuildBody';//'../../../../../Plan/components/PlanLayout/components/PlanBody';

import PathwayBody from '../../../../../Plan/components/PlanLayout/containers/PathwayBody';


export class Preview extends React.Component {

    static defaultProps = {
        isBuilderMode:false,
        isPreviewMode:true,
        elements:[],
        planId:''
    }
    render() {
        const {type, plan} = this.props;
        switch(type) {
            default:
                return <PlanBody {...this.props} />;
                break;
            case 'pathway':
                return <PathwayBody {...this.props} />
                break;
        }
    }
}



export default Preview
