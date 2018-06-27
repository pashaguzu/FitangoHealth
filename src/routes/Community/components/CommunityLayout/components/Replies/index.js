/**
 * Created by Павел on 31.01.2018.
 */
import React from 'react';
import {Icon,Avatar,List} from 'antd';
import {withRouter} from "react-router-dom";
import moment from 'moment';

const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);

class Replies extends React.Component{
    state = { visible: false ,id:null}


    render(){

        const {discussion} = this.props;
        const{edges} = discussion;
        return(
            <div>
                {edges.length > 0 ?
                            <div>
                                <List
                                    style={{marginLeft:24}}
                                    itemLayout="vertical"
                                    dataSource={edges}
                                    renderItem={item => (
                                        <List.Item key={item.id}
                                                   actions={[ moment(item.createdAt).format('LLL'), <IconText type="like-o" text="0" />]}

                                        >
                                            <List.Item.Meta
                                                avatar={<Avatar size="large"></Avatar>}
                                            />
                                            {item.text}
                                        </List.Item>

                                    )}
                /></div> : <div>No replies</div>}
    </div>
        );
    }

}
export default withRouter(Replies);

