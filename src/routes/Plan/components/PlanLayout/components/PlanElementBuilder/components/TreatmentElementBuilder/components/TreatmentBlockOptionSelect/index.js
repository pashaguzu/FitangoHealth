import React from 'react'
import { compose, branch, renderComponent, withHandlers , withProps, withState} from 'recompose';
import {Card, Row, Col, Tag } from 'antd';
import Truncate from 'react-truncate';
const gridStyle = {
    width: '25%',
    textAlign: 'left',
    minHeight:90,
    cursor: 'pointer'
};


const TreatmentBlockOptionSelectPure = ({getProperElements, onSelectType}) => {
    const elements = getProperElements();
    //console.log(elements);
    return (<Card gutter={5}>
        {elements.map(info => {
            return info[1].map(({label, type}) => {
                        return <Card.Grid style={gridStyle} key={label} span={8} onClick={() => onSelectType(type)}>{label}</Card.Grid>
                    })
        })}
    </Card>)
}

export const getProperElementsConst = () => {
     const mainElements = [
        {type:'chemotherapy', label:'Chemotherapy'},
        {type:'clinical_trial', label:'Clinical Trial'},
        {type:'medication', label:'Generic drug'},
        {type:'oncology', label:'Oncology'},
        {type:'radiation', label:'Radiation therapy'},
        {type:'radiology', label:'Imaging/Radiology'},
        {type:'pathology', label:'Pathology'},
        {type:'radiotherapy', label:'Radiotherapy'},
        {type:'surgery_reconstruction', label:'Surgery: reconstruction'},
        {type:'surgical_excision', label:'Surgical excision'},
        {type:'surgical_resection', label:'Surgical resection'},
        {type:'surgical_dissection', label:'Surgical dissection'},
        {type:'intr_chemotherapy', label:'Intravesical chemotherapy'},
        {type:'biopsy', label:'Biopsy'},
        {type:'hormone_therapy', label:'Hormone/endocrine therapy'},
        {type:'chemoradiotherapy', label:'Chemoradiotherapy'},
        {type:'outpatient_procedure', label:'Outpatient procedure'},
        {type:'extended_curettage', label:'Extended curettage'},
        {type:'metastasectomy', label:'Metastasectomy'},
        {type:'irradiation_therapy', label:'Irradiation therapy'},
        {type:'chemotherapeutic_agents', label:'Chemotherapeutic agents'},
        {type:'targeted_therapy', label:'Targeted therapy'},
        {type:'ablation_therapy', label:'Ablation therapy'},
        {type:'suppressive_therapy', label:'Suppressive therapy'},
    ];
    return mainElements;
}

export const getTreatmentElementLabel = (element) => {
    const mainElements = getProperElementsConst();

    const labels = mainElements.filter(mainElement => {
        if (mainElement.type === element.type) {
            return mainElement['label'];
        }
    })
    if (labels.length > 0) {
        return labels[0]['label'];
    }
    return '';

}
export const getProperElements = () => {
    let mainElements = getProperElementsConst();


    mainElements = mainElements.sort(function(a, b) {
        var nameA = a.label.toUpperCase(); // ignore upper and lowercase
        var nameB = b.label.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        // names must be equal
        return 0;
    });

    const extraElements = [
        {type:'decision', label:'Decision'},
    ];



    let elements = [];
    elements.push(['', mainElements]);
    //elements.push(['Tools', extraElements]);

    return elements;
}



const enhance = compose(
    //withState('type', 'setType', ''),
    withHandlers({
        getProperElements: props => event => {
            return getProperElements();
        },
        onSelectType: props => type => {
            //console.log(type);
            props.setType(type);
        }
    })
);
export const TreatmentBlockOptionSelect = enhance(TreatmentBlockOptionSelectPure);

export default TreatmentBlockOptionSelect;