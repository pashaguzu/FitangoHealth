import React from 'react';
import {Card} from 'antd';

import TodoPlansList from './containers/TodoPlansList';
import TodoMedicationItem from './containers/TodoMedicationItem';
import TodoTrackerItem from './containers/TodoTrackerItem';

export default class TodoList extends React.Component {

    static defaultProps = {
        ready:true
    }
    render () {
        const {
            userId,
            ready,
            date,
            haveTodo
        } = this.props;
        return (
            <Card title='To Do Today'>
                {haveTodo ?
                    <React.Fragment>
                <TodoPlansList ready={ready} userId={userId} date={date} />
                <TodoMedicationItem ready={ready} userId={userId} date={date} />
                <TodoTrackerItem ready={ready} userId={userId} date={date} />
                    </React.Fragment>
                    : <div className="ant-list-empty-text">Nothing to do today</div>}
            </Card>);
    }
}


