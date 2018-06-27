import { compose } from 'react-apollo'

import PlanHeader from '../components/PlanHeader'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { message } from 'antd';

const deletePlan = gql`
    mutation userPlanDelete($upid:UID!) {
       userPlanDelete(upid:$upid)
    }

`;
const withMutationDelete = graphql(deletePlan,
    {
        props: ({ ownProps, mutate }) => ({
            deletePlan: upid => {
                return mutate({
                    variables: { upid: upid},
                }).then((data) => {
                    const {plan} = ownProps;
                    ownProps.history.push('/');
                    // redirect to the dash or to the patient profile.
                    message.warning(plan.title+' has been Deleted');
                })
            },
        }),
    }
);


const completePlan = gql`
    mutation userPlanComplete($upid:UID!) {
       userPlanComplete(upid:$upid) {
            id
            isCompleted
       }
    }

`;
const withMutationComplete = graphql(completePlan,
    {
        props: ({ ownProps, mutate }) => ({
            completePlan: upid => {
                return mutate({
                    variables: {upid: upid},
                }).then((data) => {
                    const {plan} = ownProps;
                    ownProps.history.push('/');
                    // redirect to the dash or to the patient profile.
                    message.info(plan.title+' has been Completed');
                })
            },
        }),
    }
);

const PlanLayoutWithMutations = compose(
    withMutationDelete,
    withMutationComplete,
);

export default withRouter(PlanLayoutWithMutations(PlanHeader));