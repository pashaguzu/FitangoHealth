import React from 'react';
import {Card} from 'antd';
import {compose, withState, withHandlers} from 'recompose';
import ActionPlans from "../../../../components/Dashboard/containers/ActionPlans";
import CarePlans from "../../../../components/Dashboard/containers/CarePlans";
import MedicationPlanBody from "../../../../../../../Plan/components/MedicationPlan/containers/index";
import BiometricPlanBody from "../../../../../../../Plan/components/BiometricPlan/containers/index";

const tabList = [{
    key: 'aps',
    tab: 'Action Plans',
},
    {
        key: 'careplans',
        tab: 'Plans of Care',
    },
    {
        key: 'medications',
        tab: 'Medications',
    },
    {
        key: 'biometric',
        tab: 'Biometric',
    },
];


export const StakeholdersPure = props => {
    //console.log(props);
    const {activeTab, onTabChange} = props;
    //const {subtab:activeTab = 'aps'} = props.match.params;
    // ;

    const contentList = {
        aps: <ActionPlans {...props} />,
        careplans: <CarePlans {...props} />,
        medications: <MedicationPlanBody {...props} user_id={props.user.id} />,
        biometric: <BiometricPlanBody {...props}  user_id={props.user.id}  />,
    };
    return <Card
        style={{ width: '100%' }}
        tabList={tabList}
        activeTabKey={activeTab}
        onTabChange={onTabChange}
    >
        {contentList[activeTab]}
    </Card>;
}

const enhance = compose(
    withState('activeTab', 'setTab', props => {
        const {subtab = 'aps'} = props.match.params;
        return subtab;
    }),
    withHandlers({
        onTabChange: props => key => {
            props.setTab(key);
            props.handleSubTab(key);
        }
    })
);

export const Stakeholders = enhance(StakeholdersPure);
export default Stakeholders;