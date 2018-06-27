import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {FormattedDate} from 'react-intl';

import { arrayChunk, intersperse } from '../../../../utils/main';
import GetPlanstorePlan from './containers/GetPlanstorePlan';

// add placeholders
import { Card,Row, Col, Button,} from 'antd';

export class PlanstorPlanLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,

        };
    };
    static propTypes = {
        plan: PropTypes.object,
    };


    toggle = () => {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        });
    }


    planDetails()
    {
        const {plan} = this.props;
        const {start_date, end_date, gender, language, elements, categories} = plan;
        const details = [];
        if (start_date !== '') {
            details.push(['Start Date', <FormattedDate value={start_date} />]);
        }
        if (end_date !== '') {
            details.push(['End Date', <FormattedDate value={end_date} />]);
        }
        if (gender !== '') {
            details.push(['Gender', gender]);
        }
        if (gender !== '') {
            details.push(['Language', language]);
        }

        if (categories.length > 0) {
            const communities = categories.map(el => {
                return <Link to={'/community/'+el.id} key={el.id}>{el.name}</Link>;
            });
            details.push(['Categories', intersperse(communities, ', ')]);
        }

        if (elements.length > 0) {
            const inside = elements.map(el => {
                return <div key={el[1]}><i className={el[0]+' bump-r'}></i>{el[1]}</div>;
            });

            details.push(['Inside',inside]);
        }

        const chunks = Math.ceil(details.length/2);

        const chunked_arr = arrayChunk(details, chunks);
        const cols = [];
        for (var i=0,j=chunked_arr.length; i<j; i++) {

            cols[i] = chunked_arr[i].map(el => {
                return <React.Fragment key={el[0]}>
                    <Row><Col xs={12} md={6}>
                        <strong>{el[0]}:</strong>
                    </Col>
                    <Col  xs={12} md={12} >
                        {el[1]}
                    </Col> </Row>
                </React.Fragment>;

            });
        }

        return <Row>
            <Col xs={24} md={12}>

                {cols[0]}

            </Col>
            <Col xs={24} md={12}><Row>{cols[1]} </Row></Col>
        </Row>
    };


    render() {
        const {plan, loading, alreadyDownloaded, alreadyDownloadedId} = this.props;
        if (1===12 || loading) {

            //return (<div>Loading...</div>);
            return (
                <div>
                    <Row style={{marginBottom:24}}>
                        <Card loading>
                           aa
                        </Card>
                    </Row>

                    <Row style={{marginBottom:24}}>
                        <Card loading title="Description">

                            description
                        </Card>
                    </Row>
                    <Row>
                        <Card loading title="Plan Details">

                           details
                        </Card>
                    </Row>
                </div>
            );
        }





        var img = plan.thumb.large;



        return (
            <div>
                <Card>
                    <Row>
                    <Col xs={24} md={8} span={8}>
                        <img alt="example" src={img} style={{width:'100%'}} />
                    </Col>
                    <Col xs={24} md={14} offset={1} span={16} >
                        <div className="ap-card__body">
                            <div className="ap-card__title ap-card__title--large">
                                <h1>{plan.title}</h1>
                            </div>
                            <div className="ap-card__description">
                                <ul>
                                    {plan.benefits.map((el, index) => {
                                        return <li key={index}>{el}</li>;
                                    })}
                                </ul>
                            </div>
                            <div className="ap-card__action">
                                {alreadyDownloaded ? <Link to={'/plan/'+alreadyDownloadedId} ><Button icon="check" size="large" >Already Got It</Button></Link> :
                                <Button type="orange"  icon="download" size="large" onClick={this.toggle} >Get It</Button>}
                            </div>
                        </div>
                    </Col>
                    </Row>
                </Card>

                <Card title="Description">
                        {plan.description}
                </Card>

                <Card title="Plan Details">
                        {this.planDetails()}
                </Card>

                <GetPlanstorePlan
                    visible={this.state.modalIsOpen}
                    onCancel={this.toggle}
                    plan={plan}
                />

            </div>)
    }
}


export default PlanstorPlanLayout
