import React from 'react'
import PrivateRoute from '../../../routes/privateRoute';
import {asyncWorkflow, asyncActionplans, asyncProfile, asyncPatients, asyncPathways, asyncStages, asyncCancers, asyncChemotherapies, asyncTumorboards, asyncClinicalTrials,asyncNetworkManager,asyncSupervisors,asyncCareManager,asyncAnalysts,asyncSupportStaff} from '../../../routes/manager';

export const ManagerRoutes = ({store}) => {
    return (
        <React.Fragment>
            <PrivateRoute path="/u/:id/:tab?/:subtab?" component={asyncProfile(store)}/>
            <PrivateRoute path="/workflow" component={asyncWorkflow(store)}/>
            <PrivateRoute path="/patients" component={asyncPatients(store)}/>
            <PrivateRoute path="/actionplans" component={asyncActionplans(store)}/>
            <PrivateRoute path="/pathways" component={asyncPathways(store)}/>
            <PrivateRoute path="/tumorboards" component={asyncTumorboards(store)}/>
            <PrivateRoute path="/stages" component={asyncStages(store)}/>
            <PrivateRoute path="/cancers" component={asyncCancers(store)}/>
            <PrivateRoute path="/chemotherapies" component={asyncChemotherapies(store)}/>
            <PrivateRoute path="/clinicaltrials" component={asyncClinicalTrials(store)}/>
            <PrivateRoute path="/admins" component={asyncNetworkManager(store)}/>
            <PrivateRoute path="/supervisors" component={asyncSupervisors(store)}/>
            <PrivateRoute path="/ncm" component={asyncCareManager(store)}/>
            <PrivateRoute path="/analysts" component={asyncAnalysts(store)}/>
            <PrivateRoute path="/employers" component={asyncSupportStaff(store)}/>
        </React.Fragment>
    )
}
