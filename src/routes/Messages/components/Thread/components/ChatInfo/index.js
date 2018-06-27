import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import { Col, Row, Card, Button} from 'antd';
import  './index.less';

class ChatInfo extends React.Component {


    render() {
        const {loading} = this.props;

        if (loading) {
            return <Card loading>Loading...</Card>;
        }
        const {info} = this.props;
        const {subject,participants, createdAt} = info;

        let details = [
            ['Subject',subject],
            ['Created At',moment(createdAt).fromNow()],
            ['Participants', <div>{participants.edges.map((info, i) => {
                return <div key={i}><Link to={'/u/'+info.id}>{info.fullName}</Link></div>
        })}</div>]
        ];

        return (<div className="chatInfo">
            {details.map(info => <Row key={info.toString()}>
                <Col md={12}>{info[0]}</Col>
                <Col md={12}>{info[1]}</Col>
            </Row>)}

            <Button type="danger">Leave Chat</Button>

        </div>);
    }
}

export default ChatInfo