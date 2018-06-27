import React from 'react';
import {Card, Table} from 'antd';
import Alerts from "../../../../../../layouts/components/Header/components/Notifications";

export const AssessmentsTable = props => {
    return (<Card title={'Alerts history'}>
        <Alerts {...props} />
    </Card>)
}

export default AssessmentsTable;