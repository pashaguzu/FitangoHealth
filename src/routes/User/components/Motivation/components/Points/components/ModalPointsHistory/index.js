/**
 * Created by Павел on 12.02.2018.
 */
import React from 'react';
import {Button ,Spin, Table,Modal } from 'antd';
import moment from 'moment';
import {
    injectIntl
} from 'react-intl';
import {LoadingModal} from 'components/Loading';
import en from './i18n/en';
import ru from './i18n/ru';
class ModalPointsHistory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible:true
        };
    }

    render() {
        const data = [];


        const  {pointsHistory,loading} = this.props;
        if (loading) {
            return    <LoadingModal /> ;
        }
        const {intl}=this.props;
        const {edges} = pointsHistory;

        edges.forEach(item=>{
            data.push(
                {points:item.amountReceived,receivedFor:item.info.title,receivedOn:item.dateReceived}
              )
        })

        const columns = [{
            title: intl.messages.user_motivation_points,
            dataIndex: 'points',
            key: 'points'
        }, {
            title: intl.messages.user_motivation_receivedFor,
            dataIndex: 'receivedFor',
            key: 'receivedFor',
        }, {
            title: intl.messages.user_motivation_receivedOn,
            dataIndex: 'receivedOn',
            key: 'receivedOn',
            render: (date) => moment(date).format('LLL')
        }];


        return  (

            <Modal
                title={intl.messages.user_motivation_earnedPoints}
                visible={true}
                onCancel={this.props.handleCancel}
                footer={[
                    <Button key="back" onClick={this.props.handleCancel}>{intl.messages.user_motivation_ModalPoints_cancel}</Button>
                ]}
            >

           <p>{intl.messages.user_ModalPoints_motivation_text}</p><hr/>
                <Table columns={columns} dataSource={data} />
            </Modal>
        );
    }
}
export default injectIntl(ModalPointsHistory);