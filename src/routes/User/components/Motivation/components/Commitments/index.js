/**
 * Created by Павел on 12.02.2018.
 */
import React from 'react';
import {List ,Avatar,Tooltip,Button, Icon,Card } from 'antd';
import ModalMakeCommitment from './containers/ModalMakeCommitments'
import ModalView  from  './containers/ModalView';
import moment from 'moment';
import {
    injectIntl
} from 'react-intl';
import ru from './i18n/ru';
import en from './i18n/en';
class Commitments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            viewVisible:false,
                idPlan:"",
                url:"",
            commitedBy:"",
            commited:""
        };
       // this.showModalView = this.showModalView.bind(this);
    }
    showModal = () => {
        this.setState({visible: true});
    }
    showModalView = (idPlan,url,commitedBy,commited)=>  {
        this.setState({viewVisible: true,idPlan:idPlan,url:url,commitedBy:commitedBy,commited:commited});
    }
    handleCancel = () => {
        this.setState({ visible: false, viewVisible: false});

    }
    render() {
        const  {info,loading} = this.props;
        if (loading) {
            return  <Card style={{height:250}} loading title="My Commitments" >
               </Card>;
        }
        const{edges,totalCount} = info.commitments;
        const {intl}=this.props;
        const title = intl.messages.user_motivation_mycommitments;
        const count = totalCount > 0 ? " ("+totalCount+")":"";
        return  (
            <Card

                title={title+count}
                extra={<Tooltip title={intl.messages.user_motivation_addcommitments}><Button size={"small"} onClick={this.showModal} ><Icon type="plus"/></Button></Tooltip>}

            >
                { this.state.visible && <ModalMakeCommitment  handleCancel={this.handleCancel} />}
                { this.state.viewVisible && <ModalView id={this.state.idPlan} url={this.state.url} commitedBy={this.state.commitedBy} commited={this.state.commited} handleCancel={this.handleCancel} />}

                {edges.length > 0 ?
                    <div  className="demo-infinite-container">
                    <List
                        itemLayout="horizontal"
                        dataSource={edges}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar key={item.id} onClick={this.showModalView.bind(this,item.id,item.url,item.date,item.action)} size="large" />}
                                    description={<p>{item.formattedText}</p>}
                                />
                            </List.Item>
                        )}
                    /></div>
                    :
                    <div className="ant-list-empty-text">{intl.messages.user_motivation_noCommitments}</div>
                }
            </Card>

        );
    }
}
export default injectIntl(Commitments);