import React from 'react';
import ActionPlans from "../../components/Dashboard/containers/ActionPlans";
import CarePlans from "../../components/Dashboard/containers/CarePlans";
import Vitals from "../../components/Dashboard/containers/Vitals";
import Assessments from '../../containers/Assessments';
import Programs from '../../containers/Programs';
import Tasks from '../../containers/Tasks';
const Overview = props => {
    console.log(props);
    const {user={}} = props;
    const {id:userId} = user;
    return <React.Fragment>
        <Vitals userId={userId} />
        <CarePlans user={user} />
        <Programs user={user} />
        <Tasks userId={userId} />
        <Assessments user={user} />
    </React.Fragment>
}

export default Overview;