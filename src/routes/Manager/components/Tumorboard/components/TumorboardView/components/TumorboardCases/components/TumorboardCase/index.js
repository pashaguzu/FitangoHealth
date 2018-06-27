import React from 'react';
import {Card, Icon} from 'antd';
import {TumorboardElements} from "../../../TumorboardElements/index";
import {EmptyList} from "../../../../../../../../../../components/Loading/index";
import {DragHandle} from "../../../../../../../../../../components/FormCustomFields/components/Options/index";


export const deIdentifiedPatient = ({patient={}, index}) => {
    const {age, genderText, cancer='Breast Cancer'} = patient;
    return 'Case '+index+'. '+genderText + ' | '+ age+' |  '+cancer+' | Stage 1 | T1 N0 M0';
}

const TumorboardCase = props => {
    const{tumorboardCase={}, tumorboard, userId, loading, editable=false, order, removeCase, updateElements} = props;
    const {patient, elements=[]} = tumorboardCase;

    const title = deIdentifiedPatient({patient, index:order});

    let extra = null;
    if (editable) {
        extra = <div><DragHandle /> <Icon type="edit" /> <Icon type="delete" onClick={() => removeCase(tumorboardCase.id)} /></div>
    }
    return <Card title={title} extra={extra}>
        {elements.length > 0 ?
            <TumorboardElements tumorboard={tumorboard} elements={elements} editable={false} userId={userId} loading={loading} />
            : <EmptyList>No Details</EmptyList>}
    </Card>;
}

export default TumorboardCase;