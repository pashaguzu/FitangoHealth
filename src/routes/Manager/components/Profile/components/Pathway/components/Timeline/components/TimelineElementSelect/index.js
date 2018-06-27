import React from 'react';
import {Select, Tag, Icon, Card} from 'antd';
import {
    injectIntl
} from 'react-intl';
import messages from './messages';
import {FitIcon} from "../../../../../../../../../../components/FitIcon/index";
const Option = Select.Option;


export const getTimelineElementsConst = (includeViewOnly=false) => {
    let items = [
        {name:'Treatment', type:'treatment', icon:<FitIcon icon='treatment' />},
        {name:'Diagnosis', type:'diagnosis', icon:<FitIcon icon='diagnosis' />},
        {name:'Stage', type:'cancer_stage', icon:<FitIcon icon='stage' />},
        //{name:'Regimen', type:'regimen'},
        {name:'To Do', type:'checklist', icon:<FitIcon icon='to-do' />},
        {name:'Link', type:'link', icon:<Icon type="link"/>},
        {name:'Clinical Note', type:'clinical_note', icon:<FitIcon icon='clinical-note' />},
        //{name:'Procedure order', type:'procedureOrder'},
        {name:'ActionPlan', type:'ap', icon:<FitIcon icon='actionplan' />},
        {name:'Clinical Trial', type:'clinical_trial', icon:<FitIcon icon='regimen' />},
        {name:'Media', type:'media', icon:<Icon type='file' />},
        //{name:'Care Plan', type:'discharge'},
    ];
    if (includeViewOnly) {
        items.push( {name:'Tumor board', type:'tumorboard', icon:<FitIcon icon='tumorboard' />});

    }

    return items;
}

export const getTimelineElementTitle = (type) => {
    let elements = getTimelineElementsConst();

    elements = elements.filter(element => {
        return element.type == type;
    })
    if (elements.length > 0 ) {
        return elements[0]['name'];
    }
    return '';
}

class TimelineElementSelect extends React.PureComponent {


    setType = (type) => {
        this.props.onSelect(type);
    };

    render() {

        const elements = getTimelineElementsConst();
        return (
            elements.map(info => <Tag key={info.type} style={{marginBottom:5}} onClick={() => this.setType(info.type)}>{info.icon} <span>{info.name}</span></Tag>)
        );
    }
}
export default injectIntl(TimelineElementSelect);

