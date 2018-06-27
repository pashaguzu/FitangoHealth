import React from 'react';
import TodoPlanItem from '../../components/TodoPlanItem';

export default class TodoPlansList extends React.PureComponent {

    render () {
        const {
            plans
        } = this.props;
        return (
            <React.Fragment>
            {plans.map(userplan => <div key={userplan.id}>
                <TodoPlanItem plan={userplan.plan} upid={userplan.id} />
            </div>)}
            </React.Fragment>);
    }
}


