import React from 'react';
import {Link} from 'react-router-dom';
import {Icon, Button, Calendar, Card} from 'antd';

import AddCalendarEvent from '../../containers/AddCalendarEvent';


class CalendarWidget extends React.Component {
    state = {
        showAdd:false
    }

    toggleAdd = () => {
        this.setState({showAdd: !this.state.showAdd})
    }

    render() {

        return (
        <Card title="Health Calendar"
              extra={<Button.Group><Link to='/calendar'><Button size={"small"} ><Icon type="calendar" /></Button></Link><Button size={"small"}  onClick={this.toggleAdd}><Icon type="plus" /></Button></Button.Group>}
        >
            {this.state.showAdd && <AddCalendarEvent onHide={this.toggleAdd}/>}
            <Calendar fullscreen={false} />
        </Card>)
    }
}

export default CalendarWidget
