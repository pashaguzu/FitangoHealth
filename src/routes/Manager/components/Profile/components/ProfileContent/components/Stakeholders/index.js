import React from 'react';
import {Card} from 'antd';
import {compose, withState} from 'recompose';
import Providers from '../../../../containers/Providers';
import Family from '../../../../containers/Family';
import Team from '../../../../containers/Team';

const tabList = [{
    key: 'family',
    tab: 'Family Members',
},
    {
        key: 'team',
        tab: 'Care Team',
    },
    {
        key: 'providers',
        tab: 'Providers',
    }];


export const StakeholdersPure = props => {
    console.log(props);
    const {activeTab} = props;
    // ;

    const contentList = {
        family: <Family {...props} />,
        team: <Team {...props} />,
        providers: <Providers {...props} />,
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
        const {subtab = 'family'} = props.match.params;
        return subtab;
    })
);

export const Stakeholders = enhance(StakeholdersPure);
export default Stakeholders;