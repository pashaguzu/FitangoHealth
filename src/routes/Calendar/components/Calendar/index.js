import React from 'react';
import {Button, Calendar, Card} from 'antd';

import AddCalendarEvent from '../../containers/AddCalendarEvent';


const CalendarLayout = (props) => {
    const {showAdd, toggleAdd, events=[]} = props;
    return (<Card extra={<Button onClick={toggleAdd}>Add</Button>}>
        {showAdd && <AddCalendarEvent onHide={toggleAdd}/>}
        <Calendar />
    </Card>)
}

export default CalendarLayout
