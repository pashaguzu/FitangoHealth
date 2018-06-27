import React from 'react'
import PrivateRoute from '../../../routes/privateRoute';
import {
    asyncPlanstore,
    asyncHealth,
    asyncCommynity,
    asyncHelp,
    asyncMotivation,
    asyncProfile
} from '../../../routes';

export const PatientRoutes = ({store}) => {
    return (
        <React.Fragment>
            <PrivateRoute path="/planstore" component={asyncPlanstore(store)}/>
            <PrivateRoute path="/community" component={asyncCommynity(store)}/>
            <PrivateRoute path="/health" component={asyncHealth(store)}/>
            <PrivateRoute path="/help" component={asyncHelp(store)}/>
            <PrivateRoute path="/motivation" component={asyncMotivation(store)}/>
            <PrivateRoute path="/u/:uid" component={asyncProfile(store)}/>
        </React.Fragment>
    )
}