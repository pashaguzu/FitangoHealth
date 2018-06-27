import React from 'react'
import PrivateRoute from '../../../../routes/privateRoute';







export const PlanbuilderRoutes = ({store}) => {
    return (
        <React.Fragment>
            <PrivateRoute path="/workflow" component={asyncWorkflow(store)}/>
            <PrivateRoute path="/actionplans" component={asyncActionplans(store)}/>
        </React.Fragment>
    )
}
