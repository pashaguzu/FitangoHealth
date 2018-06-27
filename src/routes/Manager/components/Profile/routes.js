import React from 'react'
import PrivateRoute from '../../../../routes/privateRoute';
/** loadable **/
import Loadable from '../components/Loadable';


/** Dash **/
export const asyncWorkflow = (store) => {

    return (
        Loadable({
            loader: () => import('../routes/Manager/containers/Workflow'),
            modules: ['../routes/Manager/containers/Workflow'],
            webpack: () => [require.resolveWeak('../routes/Manager/containers/Workflow')],
        })
        //LoadSimple('Manager/containers/Workflow')
    );
}






export const ProfileRoutes = ({store}) => {
    return (
        <React.Fragment>
            <PrivateRoute path="/workflow" component={asyncWorkflow(store)}/>
            <PrivateRoute path="/actionplans" component={asyncActionplans(store)}/>
        </React.Fragment>
    )
}
