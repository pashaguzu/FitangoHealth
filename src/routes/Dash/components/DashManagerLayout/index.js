import React from 'react';
import {EmptyList} from "../../../../components/Loading/index";
import PopulationShapshot from './containers/PopulationShapshot';
import Patients from "../../../Manager/containers/Patients";

const DashManagerLayout  = props => {
    return <React.Fragment>
        <div style={{margin:24}}><PopulationShapshot /></div>
        <div style={{marginTop:16}}><Patients limit={10} /></div>
    </React.Fragment>;
}

export default DashManagerLayout