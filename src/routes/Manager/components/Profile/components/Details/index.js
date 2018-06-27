import React from 'react';
import {Card, Table} from 'antd';
import {compose, withState} from 'recompose';
import GeneralInfo from './containers/GeneralInfo';
import Overview from '../../components/Overview';
import QualMeasures from '../../containers/QualMeasures';
import Cohorts from '../../containers/Cohorts';
import Alerts from '../../containers/Alerts';
import Health from '../../components/Health';

const tabList = [{
    key: 'overview',
    tab: 'Overview',
},{
    key: 'info',
    tab: 'General Info',
},
    {
        key: 'health',
        tab: 'Health',
    },
    {
        key: 'cohorts',
        tab: 'Cohorts',
    },
    {
        key: 'alerts',
        tab: 'Alert History',
    },
    {
        key: 'qms',
        tab: 'Quality Measures',
    }];


export const StakeholdersPure = props => {
    console.log(props);
    const {activeTab} = props;
    // ;

    const contentList = {
        info: <GeneralInfo {...props} />,
        overview: <Overview {...props} />,
        health: <Health {...props} />,
        cohorts: <Cohorts {...props} />,
        alerts: <Alerts {...props} />,
        qms: <QualMeasures {...props} />,
    };
    return <Card
        style={{ width: '100%' }}
        tabList={tabList}
        activeTabKey={activeTab}
        onTabChange={(key) => { props.setTab(key); }}
    >
        {contentList[activeTab]}
    </Card>;
}

const enhance = compose(
    withState('activeTab', 'setTab', props => {
        const {subtab = 'info'} = props.match.params;
        return subtab;
    })
);

export const Stakeholders = enhance(StakeholdersPure);
export default Stakeholders;