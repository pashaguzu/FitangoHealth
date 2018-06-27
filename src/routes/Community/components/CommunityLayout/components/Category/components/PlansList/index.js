/**
 * Created by Павел on 27.01.2018.
 */

import React from 'react';
import { Card,List  } from 'antd';
import PlanWidget from '../../../../../../../Plan/components/Plan';
import { withApollo } from 'react-apollo'
import '../../../../../../style.css';
import {
    withRouter
} from 'react-router-dom'
import {
    injectIntl
} from 'react-intl';
import messages from './plan.json';
class PlansList extends React.PureComponent{




    onChange = (value) => {
        if (!this.props.loading)
            this.props.loadMoreEntries(value)
    };

    onSelect(value) {
        this.props.history.push('/community/'+value)
    }



    render(){
    const {plans,loading}= this.props;
        const { intl } = this.props;
        return(
            <Card
            title={intl.formatMessage(messages.relatedPlan)}
            >
                {plans.length > 0 ? <List
                    split={false}
                    loading={loading}
                    grid={{gutter: 10, xs: 1, sm: 1, md: 2, lg: 3, xl: 5}}
                    dataSource={plans}
                    renderItem={product => (
                        <List.Item key={product.id}>
                            <PlanWidget info={product} key={product.id}/>
                        </List.Item>
                    )}
                /> : <Card style={{textAlign:'center'}}>{intl.formatMessage(messages.noPlan)}</Card>}
            </Card>
        );
    }
}
export default withApollo(withRouter(injectIntl(PlansList)));
