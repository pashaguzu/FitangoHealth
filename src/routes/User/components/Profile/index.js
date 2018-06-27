import React from 'react';
import moment from 'moment';
import {Row,Icon,Col,Card,Progress } from 'antd';
import PlansList from '../../../Plan/containers/PlansList';
import Promises from '../../components/Motivation/containers/Promises.js';
import Commitments from '../../components/Motivation/containers/Commitments.js';
import Avatar from '../Avatar/index'
const gridStyle = {
    width: '25%',
    textAlign: 'center',
};
class ViewProfile extends React.Component {

    static defaultProps = {
        date: moment()
    }
    render() {

        const{info,loading, match, date}=this.props;

        const uid = match.params.uid;
        if (loading) {
            return  <Card loading > </Card>;
        }
       // console.log(this.props);
        const {points,nextLevel} = info.motivation.currentLevel;
        //const {medications} = info.motivation.adherenceSummary;
        //console.log(info.motivation.adherenceSummary);
        //const {level} = medications;
        const level = 0;

        const {amount,title} = nextLevel;
        let remainingPoint = amount-points;
        const percent = Math.round(points/amount*100);
        return  (


            <Row gutter={15}>

                <Col xs={24} md={14} lg={15} xl={17}>
                    <Card style={{marginBottom:15}}>
                        <Col span={8}>
                            <Avatar info={this.props.info} size="huge" />
                            {/*<center>*/}
                                {/*<Avatar style={{width:100,height:100,borderRadius:50}} />*/}
                                {/**/}
                                {/*<p>{info.fullName}</p>*/}
                            {/*</center>*/}
                        </Col>
                        <Col span={8}>
                            <center>
                                <Icon type="star" style={{ fontSize: 40, color: '#FFFF00' }} />
                            </center>
                                <Progress percent={percent} />

                            <center><div><h2>{points}</h2></div><div>{remainingPoint} Total Point</div></center>

                        </Col>
                        <Col span={8}>
                            <center>
                                <Progress type="dashboard" percent={level} />
                            </center>
                        </Col>
                    </Card>
                    <PlansList title={"ActionPlans you Motivate "+info.fullName} ready={!loading} date={date} user_id={uid} list />

                </Col>
                <Col xs={24} md={10} lg={9} xl={7}>
                    <Promises userId={uid} />
                    <Commitments userId={uid} />
                </Col>
            </Row>



        );
    }
}
export default ViewProfile;