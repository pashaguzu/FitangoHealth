import React from 'react';
import {Row, Col, Card} from 'antd';
import {EmptyList} from "../../../../../../components/Loading/index";
import {DiagnosesList} from "../../../../../Health/containers/Diagnoses";
import Vitals from "./containers/Vitals";
import Stages from "./containers/Stages";
import ActionPlans from "./containers/ActionPlans";
import HealthItems from "./containers/HealthItems";
import Tumorboards from "./containers/Tumorboards";
import News from "./containers/News";
import Timeline from "./containers/Timeline";
import Genomics from "./components/Genomics";
import FamilyHistory from "./components/FamilyHistory";


const Overview = props => {
    console.log(props);
    const {user={}} = props;
    const {id:userId} = user;
    return <React.Fragment>
        <Row gutter={16}>
            <Col xl={17}>

                        <Stages userId={userId} />
                <Row  style={{marginBottom:16}}>
                    <Col>
                        <Vitals userId={userId} />
                    </Col>
                </Row>

                <Row gutter={16} style={{marginBottom:16}}>
                    <Col lg={12}>
                        <HealthItems userId={userId} title="Diagnosis" type="diagnosis" />
                    </Col>
                    <Col lg={12}>
                        <HealthItems userId={userId} title="Treatments" type="treatment" />
                    </Col>
                </Row>
                <Row gutter={16} style={{marginBottom:16}}>
                    <Col lg={12}>
                        <Genomics userId={userId} />
                    </Col>
                    <Col lg={12}><Tumorboards userId={userId} /></Col>
                </Row>
                <Row  gutter={16} style={{marginBottom:16}}>
                    <Col lg={12}>
                        <HealthItems userId={userId} title="Clinical Trials" type="clinical_trial" />
                    </Col>
                    <Col lg={12}>
                        <HealthItems userId={userId}  title="Medications" type="medication" />
                    </Col>
                </Row>
                <Row  gutter={16} style={{marginBottom:16}}>
                    <Col lg={12}>
                        <ActionPlans userId={userId} />
                    </Col>
                    <Col lg={12}>
                        <FamilyHistory userId={userId} />
                    </Col>
                </Row>
            </Col>
            <Col xl={7}>
                <Timeline userId={userId} />
                <News userId={userId} />
            </Col>
        </Row>
    </React.Fragment>
}

export default Overview;