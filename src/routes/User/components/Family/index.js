/**
 * Created by Pavel on 08.01.2018.
 */
import React from 'react';
import { Link } from 'react-router-dom'
import AvatarWithName from '../AvatarWithName/index';
import { Form,  List, Card } from 'antd';
import {
    injectIntl,
    FormattedMessage
} from 'react-intl';
import en from './i18n/en';
import ru from './i18n/ru';
class Family extends React.Component {



    render() {

        const  {info,loading} = this.props;

        if (loading) {
                return  <Card loading title="Family">
                Loading</Card>;
        }
        const  {family} = info;
        const { getFieldDecorator } = this.props.form;
        const { intl } = this.props;
        const  {edges} = family;
        const title = intl.messages.user_family_title;

        const count = this.props.info.family.totalCount > 0 ?  " ("+this.props.info.family.totalCount+")":"";


        return edges.length > 0 ?
        ( <Card title={title+count}>
            <List
                split={false}
                loading={loading}
                grid={{gutter: 10, xs: 3, md: 1, lg: 2/*, xl: 4*/}}
                dataSource={edges}
                renderItem={person => (

                    <List.Item key={person.id}>
                        <Link to={'/u/'+person.id} style={{color: 'inherit'}}>
                            <AvatarWithName info={person.user} />
                        </Link>

                    </List.Item>
                )}
            />
        </Card>) : null;

    }
}

const WrappedFamily = Form.create()(Family);
export default injectIntl(WrappedFamily);