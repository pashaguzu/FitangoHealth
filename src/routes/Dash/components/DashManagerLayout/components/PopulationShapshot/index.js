import React from 'react'
import {Row, Col, Card} from 'antd';
import RiskLevelGraph from './components/RiskLevelGraph';
import MedicationAdherenceGraph from './components/MedicationAdherenceGraph';
import EngagementGraph from './components/EngagementGraph';

const PopulationShapshot = props => {
    const {snapshot={}} = props;
    const {riskLevel=[], medicationAdherence=[], engagement=[]} = snapshot;
    return <Row gutter={16}>
        <Col md={8}><Card title="Risk Level"><RiskLevelGraph items={riskLevel} /></Card></Col>
        <Col md={8}><Card title="Medication Adhrerence"><MedicationAdherenceGraph items={medicationAdherence} /></Card></Col>
        <Col md={8}><Card title="Engagement"><EngagementGraph items={engagement} /></Card></Col></Row>;
}

export default PopulationShapshot;