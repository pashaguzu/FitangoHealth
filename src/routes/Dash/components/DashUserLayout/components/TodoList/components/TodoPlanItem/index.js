import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col, Progress} from 'antd';

export default class TodoPlanItem extends React.PureComponent {

    render () {

        const {
            plan,
            upid
        } = this.props;
        return (
            <Link to={'/plan/'+upid} style={{color:'inherit'}}>
            <Row type="flex" justify="space-between" align="top" style={{padding:5}}>
                <Col xs={3} md={2}>
                    <Progress type="circle" showInfo={plan.progress === 100} percent={plan.progress}  width={30} />
                    </Col>
                <Col xs={20} md={21} offset={1} style={{paddingTop:3}}>
                    {plan.title}
                </Col>
            </Row></Link>);
    }
}


