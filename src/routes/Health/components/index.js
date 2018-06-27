import React from 'react';
import { withApollo } from 'react-apollo'
import Loadable from '../../../components/Loadable';
import { Route } from 'react-router-dom'
import {Tabs, Card} from 'antd';
const TabPane = Tabs.TabPane;



const AsyncRecords = () => {
    return (
        Loadable({
            loader: () => import('../containers/Records'),
            modules: ['../containers/Records'],
            webpack: () => [require.resolveWeak('../containers/Records')],
        })
    );
}
const AsyncImmunization = () => {
    return (
        Loadable({
            loader: () => import('./Immunization'),
            modules: ['./Immunization'],
            webpack: () => [require.resolveWeak('./Immunization')],
        })
    );
}

const AsyncVisits = () => {
    return (
        Loadable({
            loader: () => import('./Visits'),
            modules: ['./Visits'],
            webpack: () => [require.resolveWeak('./Visits')],
        })
    );
}



class Health extends React.Component{

    handleChange = (tabKey) => {
        this.props.history.push(tabKey)
    }
    render() {
        const match = this.props.match;

        return (
            <Card>
                <Tabs tabPosition="top" defaultActiveKey={this.props.location.pathname} onChange={this.handleChange}>
                    <TabPane tab={'My Records'} key={match.url}><Route exact path={match.url} component={AsyncRecords()} /></TabPane>
                    <TabPane tab={'Immunizations'} key={match.url+'/immunization'} ><Route exact path={match.url+'/immunization'} component={AsyncImmunization()} /></TabPane>
                    <TabPane tab={'Visits'} key={match.url+'/visits'} ><Route exact path={match.url+'/visits'} component={AsyncVisits()} /></TabPane>
                </Tabs>
            </Card>
        );
    }
}

export default withApollo(Health);
