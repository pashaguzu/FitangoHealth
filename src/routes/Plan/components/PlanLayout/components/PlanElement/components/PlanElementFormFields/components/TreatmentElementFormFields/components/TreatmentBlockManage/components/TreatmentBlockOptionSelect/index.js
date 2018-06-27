import React from 'react'
import { compose, branch, renderComponent, withHandlers , withProps, withState} from 'recompose';
import {Row, Col, Tag } from 'antd';



const TreatmentBlockOptionSelectPure = ({getProperElements, onSelectType}) => {
    const elements = getProperElements();
console.log(elements);
    return (<Row gutter={5}>
        {elements.map(info => {
            return <Col key={info[0]}><h4>{info[0]}</h4>
                <Row gutter={5}>
                    {info[1].map(({label, type}) => {
                        return <Col key={label} span={8} onClick={() => onSelectType(type)}><Tag  style={{width:'100%', textAlign:'center'}} >{label}</Tag></Col>
                    })}
                </Row>
            </Col>
        })}
    </Row>)
}

export const getProperElements = () => {
    const mainElements = [
        {type:'chemotherapy', label:'Chemotherapy'},
        {type:'medication', label:'Generic drug'},
        {type:'radiationtherapy', label:'Radiation therapy'},
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

    const extraElements = [
        {type:'decision', label:'Decision'},
    ];

    let elements = [];
    elements.push(['Main', mainElements]);
    elements.push(['Tools', extraElements]);

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