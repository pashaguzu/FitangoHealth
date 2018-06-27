/**
 * Created by Павел on 12.02.2018.
 */
import React from 'react';
import {List, Card } from 'antd';
import {
    injectIntl
} from 'react-intl';
import Avatar from '../../../Avatar';

import ru from './i18n/ru';
import en from './i18n/en';
class Promises extends React.Component {



    render() {
        const {info,intl, loading} = this.props;

        if (loading) {
            return <Card style={{height:250}} loading title="My Promises">
            </Card>;
        }
        return  (
            <Card  title={intl.messages.user_motivation_promises}>

                {info.promises.edges > 0 ?
                    <List
                        itemLayout="horizontal"
                        dataSource={info.promises.edges}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar onClick={this.showModalView} size="large"
                                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                    description={<div>
                                        <div dangerouslySetInnerHTML={{__html: item.description}}/>
                                    </div>}
                                />
                            </List.Item>
                        )}
                    /> :
                    <div className="ant-list-empty-text">{intl.messages.user_motivation_nopromises}</div>
                }
            </Card>

        );
    }
}
export default injectIntl(Promises);