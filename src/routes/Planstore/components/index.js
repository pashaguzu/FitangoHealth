

import React from 'react';
import Loadable from '../../../components/Loadable';
import { Route } from 'react-router-dom'

const AsyncIndex = () => {
    return (
        Loadable({
            loader: () => import('../../../routes/Planstore/containers/index.js'),
        })
    );
}


const AsyncView = () => {
    return (
        Loadable({
            loader: () => import('../../../routes/Planstore/containers/view.js'),
        })
    );
}

export const PlanstoreLayout = ({plans, loading, loadMoreEntries}) => (
    <div>
        <Route exact path='/planstore' component={AsyncIndex()} />
        <Route exact path='/planstore/plan/:id' component={AsyncView()} />
    </div>
)

export default PlanstoreLayout
