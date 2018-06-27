import React from 'react';
import {Row, Col, Progress} from 'antd';


export default class TodoMedicationItem extends React.PureComponent {

    render () {
        const {
            progress,
            medicationPlan
        } = this.props;

        if (medicationPlan.id === null) {
            return null;
        }
        return (
            <Row type="flex" justify="space-between" align="top" style={{padding:5}}>
                <Col xs={3} md={2}>
                    <Progress type="circle" showInfo={progress === 100}  percent={progress > 0 ? progress : 0} width={30} />
                    </Col>
                <Col xs={20} md={21} offset={1} style={{paddingTop:3}}>
                    Medication Plan
                </Col>
            </Row>);
    }
}


