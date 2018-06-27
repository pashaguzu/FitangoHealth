/**
 * Created by Pavel on 08.01.2018.
 */
import React from 'react';
import {  Link } from 'react-router-dom'
import {
    injectIntl
} from 'react-intl';
import AvatarWithName from '../AvatarWithName/index';
import en from './i18n/en.js';
import ru from './i18n/ru.js';
import {Form,List, Card } from 'antd';
class CareTeam extends React.Component {

    render() {
        const  {info,loading} = this.props;
        if (loading) {
            return  <Card loading title="CareTeam" >
                Loading</Card>;
        }
        const {intl}=this.props;
        const  {careTeam} = info;
        const  {edges} = careTeam;
        console.log(intl.messages.user_careteam_title);
        const title = intl.messages.user_careteam_title;
        const count = this.props.info.careTeam.totalCount > 0 ?  " ("+this.props.info.careTeam.totalCount+")":"";
        return edges.length > 0 ?
            ( <Card title={title+count}>
                <List
                    split={false}
                    loading={loading}
                    grid={{gutter: 10, xs: 3,   md: 1, lg: 2/*, xl: 4*/}}
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
const WrappedCareTeam = Form.create()(CareTeam);
export default injectIntl(WrappedCareTeam);