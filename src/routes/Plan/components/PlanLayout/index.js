import React from 'react'
import PropTypes from 'prop-types'

import PlanHeader from './containers/PlanHeader';
import PlanBody from './containers/PlanBody';
import {Card } from 'antd';
import moment from "moment/moment";

export class PlanLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: props.date,
            infoModal: false,
        };
        this.setDate = this.setDate.bind(this);
        this.toggleIntro = this.toggleIntro.bind(this);
    };
    static propTypes = {
        plan: PropTypes.object,

    };
    static defaultProps = {
        date:  moment().format('YYYY-MM-DD')
    };
    setDate = (date) => {
        this.setState({date:date});
    };
    toggleIntro() {
        this.setState({infoModal:!this.state.infoModal});
    };

    render() {
        const {info, plan, user, loading} = this.props;
        if (loading) {

            //return (<div>Loading...</div>);
            return (
                <Card loading>
                    aaa
                </Card>
            );
        }

        return (
            <div>

                <PlanHeader plan={plan} user={user} info={info} toggleIntro={this.toggleIntro} setDate={this.setDate} />
                <Card>
                <PlanBody upid={info.id} id={plan.id} userId={user.id} date={this.state.date} showIntro={this.state.infoModal} hideIntro={this.toggleIntro}></PlanBody>
                </Card>
            </div>)
    }
}



export default PlanLayout
