import React from 'react';
//import Decision from './containers/Decision';


export const TreatmentElementBlockItem = ({planId, details, showChildren, isPreviewMode, mode, }) => {
    const {type, description='', element={}} = details;
    let html = null;
    switch(type) {
        case 'chemotherapy':
            console.log(details);
            console.log(element);
            const {info = {}} = element;
            const {chemotherapyElement=info} = details;
            console.log(chemotherapyElement);
            const {cycles, days, notes, timesPerDay, chemotherapy={}} = chemotherapyElement;
            const {title:chemotherapyTitle=''} = chemotherapy;
            //console.log(details);
            html = chemotherapyTitle+', Cycles:'+cycles+', Days:'+days+', Times/Day: '+timesPerDay;
            break;
        /*case 'decision':
            //element
            html = <React.Fragment>
                <Decision planId={planId} elementId={element.id} isPreviewMode={isPreviewMode} mode={mode} options={element.info.options} />
            </React.Fragment>
            break;*/
        default:
            html = description;
            break;
    }

    return html

}

export default TreatmentElementBlockItem;