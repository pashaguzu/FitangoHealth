/**
 * Created by Pavel on 06.12.2017.
 */
import React from 'react';
import { withApollo } from 'react-apollo'
import {Tabs, Card} from 'antd';
import Loadable from '../../../../../components/Loadable';
import { Route } from 'react-router-dom'
import {
    FormattedMessage,
} from 'react-intl';

const TabPane = Tabs.TabPane;



const AsyncBasic = () => {
    return (
        Loadable({
            loader: () => import('../../../../../routes/User/components/Settings/components/Basic/containers/index.js'),
        })
    );
}
const AsyncPassword = () => {
    return (
        Loadable({
            loader: () => import('../../../../../routes/User/components/Settings/components/Password/containers/index.js'),
        })
    );
}

 const AsyncPicture = () => {
     return (
         Loadable({
             loader: () => import('../../../../../routes/User/components/Settings/components/Picture/containers/index.js'),
         })
     );
 }



class SettingForm extends React.Component{
    state = {
        tabPosition: 'top',
    }
    handleChange = (tabKey) => {
        this.props.history.push(tabKey)

    }
    render() {
        const match = this.props.match;
        return (
            <Card>
                <Tabs tabPosition="left" defaultActiveKey={this.props.location.pathname} onChange={this.handleChange}>
                    <TabPane tab={<FormattedMessage id="user.settings.basic" defaultMessage="Basic" description="Basic" />} key={match.url}><Route exact path={match.url} component={AsyncBasic()} /></TabPane>
                    <TabPane tab={<FormattedMessage id="user.settings.password" defaultMessage="Password" description="Password" />} key={match.url+'/password'} ><Route exact path={match.url+'/password'} component={AsyncPassword()} /></TabPane>
                    <TabPane tab={<FormattedMessage id="user.settings.picture" defaultMessage="Picture" description="Picture" />} key={match.url+'/picture'} ><Route exact path={match.url+'/picture'} component={AsyncPicture()} /></TabPane>
                </Tabs>
            </Card>
        );
    }
}

export default withApollo(SettingForm);
