import React from 'react';
import { withRouter } from 'react-router-dom'
import moment from 'moment';
import Loading from 'components/Loading';
import {withActiveUser} from "../../../../../components/App/app-context";


import InfiniteScroll from 'react-infinite-scroller';


import { Popconfirm, Row, Col,Button, List, Spin, Icon,} from 'antd';
import Avatar from 'routes/User/components/Avatar';
import {compose, withState, lifecycle, withHandlers} from 'recompose';


const Notifications = props => {
 
        const { loading, notifications, hasMore, handleInfiniteOnLoad, handleNotification } = props;
        if (loading) {
            return <Loading />;
        }

        if (notifications.length === 0) {
            return <div className="ant-list-empty-text">No notifications</div>
        }
        // console.log(props.activeUser, 'ActiveUser');
        const canReport = false;
        return (
            <div className="infinite-container">
            <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                loadMore={handleInfiniteOnLoad}
                hasMore={!loading && hasMore}
                useWindow={false}
            >
                <List
                    dataSource={notifications}
                    renderItem={message => (
                        <List.Item key={message.id} >

                            <List.Item.Meta
                                avatar={<Avatar info={message.sender} />}
                                title={message.text}
                                description={<Row type="flex" justify="space-between" >
                                    <Col xs={12}>{moment(message.dateSent).calendar()}</Col>
                                    {canReport && message.isRequest && <Col xs={12}><Popconfirm title="Are you sure decline this request?" getPopupContainer={triggerNode => triggerNode.parentNode}
                                                             onConfirm={ (e) => handleNotification(e, message.id, false)}
                                    ><Button size='small' type="dashed" >Decline</Button></Popconfirm> <Button size='small' type="primary" ghost onClick={ (e) => handleNotification(e, message.id, true)}>Approve</Button></Col>}
                                </Row>}
                            />
                        </List.Item>
                    )}
                />
                {loading && <Spin className="demo-loading" indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />}
            </InfiniteScroll>
            </div>
        );
}

const enhance = compose(
    withActiveUser,
    withRouter,
    withState('loading', 'setLoading', false),
    withHandlers({
        stopLoading: props => () => {
            props.setLoading(false);
        },
        handleNotification: props => (e, id, approved) => {
            e.preventDefault();
            props.handleNotification(id, approved).then(({data}) => {

                if (!approved) {
                    return;
                }
                const {history} = props;
                // check on notification
                const {
                    action,
                    actionId,
                    userId,
                    date} = data.handleNotification;

                switch(action) {
                    default:break;
                    case 'goUser':
                        //'description' => 'Go to user profile by User ID'
                        history.push('/u/'+userId);
                        break;
                    case 'goUserPlan':
                        //'description' => 'Go to user Plan by User Plan ID'
                        history.push('/plan/'+actionId);
                        break;
                    case 'goPlanstorePlan':
                        //'description' => 'Go to planstore plan by Plan ID'
                        history.push('/planstore/plan/'+actionId);
                        break;
                    case 'getUserPlan':
                        // 'description' => 'Get User plan By User Plan ID. Show page where we can get plan by User Plan ID. REQUEST ID IS MANDATORY TO PASS'
                        break;
                    case 'goPlanBuilderPlan':
                        // 'description' => 'Go to plan builder plan by Plan ID'
                        history.push('/pb/'+actionId);
                        break;
                    case 'getPlan':
                        // 'description' => 'Get Plan by Plan ID.  REQUEST ID IS MANDATORY TO PASS'
                        history.push('/planstore/plan/'+actionId+'/#download');
                        break;
                    case 'goBiometricPlan':
                        // 'description' => 'Go to biometric plan by User ID'
                        history.push('/u/'+userId+'/biometric/#date='+date);
                        break;
                    case 'goMedicationPlan':
                        // 'description' => 'Go to medication plan by User ID'
                        history.push('/u/'+userId+'/medication/#date='+date);
                        break;
                    case 'goAssessment':
                        //  'description' => 'Go to assessment by ID'
                        history.push('/assessment/'+actionId);
                        break;
                    case 'goReferral':
                        history.push('/referral/'+actionId);
                        break;
                    case 'goDiscussion':
                        history.push('/community/discussion/'+actionId);
                        break;
                    case 'goComment':
                        history.push('/community/discussion/comment/'+actionId);
                        break;
                    case 'goCalendar':
                        history.push('/calendar');
                        break;
                    case 'goTask':
                        history.push('/tasks/'+actionId);
                        break;
                    case 'goHealth':
                        history.push('/u/'+userId+'/health');
                        break;
                    case 'goTransition':
                        // 'description' => 'Go to Transition by User ID and ID'
                        history.push('/u/'+userId+'/transition');
                        break;
                    case 'goDME':
                        history.push('/dme/'+actionId);
                        break;
                    case 'goPromise':
                        history.push('/u/'+userId+'/promises/'+actionId);
                        break;
                    case 'goCommitment':
                        history.push('/u/'+userId+'/commitments/'+actionId);
                        break;
                    case 'goMedication':
                        // 'description' => 'Go to Medication by ID and User ID'
                        history.push('/u/'+userId+'/medication/#'+actionId+'&date='+date);
                        break;
                    case 'goTracker':
                        // 'description' => 'Go to Tracker by ID and User ID'
                        history.push('/u/'+userId+'/biometric/#'+actionId+'&date='+date);
                        break;
                }
            });
        }
    }),
    withHandlers({
        handleInfiniteOnLoad: props => () => {
            props.setLoading(true);
            this.props.loadMore(props.endCursor, props.stopLoading);
        }
    }),
    lifecycle({
        componentWillReceiveProps(nextProps) {
            if (!nextProps.loading && nextProps.totalCount !== this.props.totalCount) {
                if (this.props.handleTotalNewNotifications)
                    this.props.handleTotalNewNotifications(nextProps.totalCount);
            }
        }
    })
);

export default enhance(Notifications);