import React from 'react'
import {NavLink, withRouter } from 'react-router-dom';
import { Menu, Icon,  Badge } from 'antd';
import NotificationBadge from '../../containers/NotificationBadge';


class RightMenu extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.toggleUser = this.toggleUser.bind(this);
        this.state = {
            isOpen: false,
            isOpenUser: false,
            loading: false,
        };
    }
    static defaultProps = {
        lastNotification: ''// last notification cursor
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    toggleUser() {
        this.setState({
            isOpenUser: !this.state.isOpenUser
        });
    }

    componentWillReceiveProps(nextProps) {

        if (!nextProps.token && nextProps.token !== this.props.token) {
            // reload to logout
            this.props.history.push('/logout');
        }
    }

    render() {
        const {unreadMessages, loading, lastNotificationCursor, newCursor, newNotificationsNum} = this.props;

        // first call - lastNotification - empty, but lastCursor has value. It means that we can load the notifications
        const loadNew = !loading && lastNotificationCursor !== newCursor;
        return (
            <Menu
                selectedKeys={['1']}
                mode="horizontal"
                style={{'borderBottom':'none', 'float':'right'}}
            >
                <Menu.Item key='inbox'>
                    <NavLink to="/messages"><Badge count={unreadMessages}><Icon type="mail" /></Badge></NavLink>
                </Menu.Item>
                {/*<Menu.Item key='points'>
                    <Popover content={content} title='250 points'  >
                        <Link to="/motivation"> <Icon type="star-o" /></Link>
                    </Popover>
                </Menu.Item>*/}

                <Menu.Item key='notifications'>
                    <NotificationBadge  newNotificationsNum={newNotificationsNum}  loadNew={loadNew} newCursor={newCursor} lastCursor={lastNotificationCursor} updateLastNotification={this.props.updateLastNotification} />
                </Menu.Item>
            </Menu>
        );
    }
}

export default withRouter(RightMenu);
