/**
 * Created by Павел on 10.02.2018.
 */
import React from 'react';
import Medications from './components/AdherenseSummary/components/Medications'
import Actionplans from './components/AdherenseSummary/components/Actionplans'
import Trackers from './components/AdherenseSummary/components/Trackers'
import Badges from './containers/Badges.js'
import Motivators from '../../containers/motivatorsContainer';
import Points from './containers/Points.js';
import Promises from './containers/Promises.js';
import Commitments from './containers/Commitments.js';
import IMotivate from './containers/iMotivate';

import {Row,Col,Card} from 'antd';
class Motivation extends React.Component {



    render() {

        const  {info,loading} = this.props;

        if (loading) {
            return  <Card loading >
                Loading</Card>;
        }
        const{adherenceSummary} = info;
        const {medications,trackers,plans} = adherenceSummary;
        return  (
            <React.Fragment>
                <Row style={{marginBottom:10}} gutter={18}>
                {medications && <Col style={{marginBottom:10}} xs={24} md={10} lg={9} xl={6}>
                    <Medications medications={medications} />

                </Col>}
                {trackers && <Col style={{marginBottom:10}} xs={24} md={10} lg={9} xl={6}>
                    <Trackers trackers={trackers} />

                </Col >}
                {plans && <Col style={{marginBottom:10}}  xs={24} md={10} lg={9} xl={6}>
                    <Actionplans plans={plans} />

                </Col>}

                 <Col style={{marginBottom:10}}   xs={24} md={10} lg={9} xl={6}>
                    <Badges />

                </Col>
                <Col style={{marginBottom:10}}   xs={24} md={10} lg={9} xl={6}>
                    <Motivators />

                </Col>
                <Col style={{marginBottom:10}}   xs={24} md={10} lg={9} xl={6}>
                    <Points />

                </Col>
                <Col style={{marginBottom:10}}    xs={24} md={10} lg={9} xl={6}>
                    <Promises />

                </Col>
                <Col style={{marginBottom:10}}   xs={24} md={10} lg={9} xl={6}>
                    <Commitments />

                </Col>
                <Col  style={{marginBottom:10}}   xs={24} md={10} lg={9} xl={6}>
                    <IMotivate />

                </Col>
                </Row>
            </React.Fragment>
            );
    }
}
export default Motivation;