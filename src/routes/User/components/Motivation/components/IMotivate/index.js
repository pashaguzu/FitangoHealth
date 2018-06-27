/**
 * Created by Павел on 12.02.2018.
 */
import React from 'react';
import {Avatar,List, Card } from 'antd';
import {
    injectIntl
} from 'react-intl';

import ru from './i18n/ru';
import en from './i18n/en';
class iMotivate extends React.Component {

    render()
    {
        const {info, loading} = this.props;

        if (loading) {
            return <Card style={{height:250}} loading title="I Motivate">
          </Card>;
        }
        const {edges,totalCount} = info;
        const {intl}=this.props;
        const title = intl.messages.user_motivation_imotivate;
        const count = totalCount > 0 ? " ("+totalCount+")":"";
        return (

            <Card style={{height:250}}  title={title+count}>
                {totalCount > 0 ?
                <List
                    split={false}
                    loading={loading}
                    grid={{gutter: 10, xs: 1, sm: 2, md: 3, lg: 6, xl: 6}}
                    dataSource={edges}
                    renderItem={item => (
                        <List.Item key={item.id}>
                               <Avatar style={{
                                    verticalAlign: 'middle'
                                }} size="large" src={item.user.thumb} />
                                <span
                                    style={{textAlign: 'center', 'marginLeft': 10}}><p>{item.user.fullName}</p>
                                    </span>
                        </List.Item>
                    )}
                />:   <div className="ant-list-empty-text">{intl.messages.user_motivation_noimotivate}</div>
                }
            </Card>

        );
    }
}
export default injectIntl(iMotivate);