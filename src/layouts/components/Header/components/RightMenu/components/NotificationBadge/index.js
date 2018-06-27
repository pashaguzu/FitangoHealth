import React from 'react'
import {
    injectIntl
} from 'react-intl';
import messages from './messages';
import Notification from '../../../../containers/Notifications'

import {Tabs, Popover, Icon,  Badge, notification } from 'antd';
const TabPane = Tabs.TabPane;


 class RightMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            totalNewNotifications:props.totalNewNotifications
        };
    }
    static defaultProps = {
        lastCursor: '',
        loading:true
    }

     handleVisibleChange = (visible) => {
         this.setState({ visible });
     }

     handleTotalNewNotifications = (totalNewNotifications) => {
         this.setState({ totalNewNotifications });
     }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.loading && nextProps.totalNewNotifications !== this.props.totalNewNotifications) {
            this.handleTotalNewNotifications(nextProps.totalNewNotifications);
        }
    }

    componentDidUpdate(prevProps) {


        if (!this.props.loading) {
            const {newCursor, lastCursor, newNotificationsNum} = this.props;


            if (newCursor && newCursor !== lastCursor) {
                this.props.updateLastNotification(newCursor);

                if (lastCursor !== '') {

                    if (newNotificationsNum > 0) {
                        // if we have 1-2 notification - show them. if we have more than 2, then show general message
                        notification['info']({
                            message: 'New Notifications',
                            description: this.props.intl.formatMessage(messages.newNotifications, {itemCount:newNotificationsNum}),
                        });
                    }
                }
            }




        }
    }
    render() {
        const unreadNotifications = this.state.totalNewNotifications;

        const content = (
            <Tabs defaultActiveKey="1" style={{width: 336}} tabPosition="top">
                <TabPane tab="Notifications" key="1"><Notification lastCursor={this.props.lastCursor} handleTotalNewNotifications={this.handleTotalNewNotifications} /></TabPane>
                {/*<TabPane tab="Tasks" key="2"><div className="ant-list-empty-text">No tasks</div></TabPane>*/}
            </Tabs>
        );

        return (
            <Popover placement="bottomRight" content={content}
                     visible={this.state.visible}
                     onVisibleChange={this.handleVisibleChange}
                     trigger="click" style={{width: 336}}>
                 <Badge count={unreadNotifications} overflowCount={999}><Icon type="bell" /></Badge>
            </Popover>
        );
    }
}

export default injectIntl(RightMenu);
