import React from 'react';
import {Row, Col, Card} from 'antd';
import HealthItems from "../Dashboard/containers/HealthItems";
import Tumorboards from "../Dashboard/containers/Tumorboards";
import Genomics from "../Dashboard/components/Genomics";
import LabTestResults from './containers/LabTestResults';

const Overview = props => {
    const {user={}} = props;
    const {id:userId} = user;
    return <React.Fragment>
        <Row gutter={16} style={{marginLeft:8}}>
            <Col>
                <Row  gutter={16} style={{marginBottom:16}}>
                    <Col lg={12}>
                        <HealthItems userId={userId} title="Allergies" type="allergy" />
                    </Col>
                    <Col lg={12}>
                        <HealthItems userId={userId} title="Med Allergies" type="med_allergy" />
                    </Col>
                </Row>
                <Row  gutter={16} style={{marginBottom:16}}>
                    <Col lg={12}>
                        <HealthItems userId={userId} title="Diagnosis" type="diagnosis" />
                    </Col>
                    <Col lg={12}>
                        <HealthItems userId={userId} title="Treatments" type="treatment" />
                    </Col>
                </Row>
                <Row  gutter={16} style={{marginBottom:16}}>
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
                <Row  gutter={16}>
                    <Col lg={12}>
                        <HealthItems userId={userId} title="Documents Trials" type="document" />
                    </Col>
                    <Col lg={12}>
                        <LabTestResults userId={userId} />
                    </Col>
                </Row>
            </Col>
        </Row>
    </React.Fragment>
}

export default Overview;