

/*  This is a containers components. Notice it does not contain any JSX,
    nor does it import React. This components is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    components - in this case, the counter:   */

import PlanLayout from '../../Plan/components/PlanLayout'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


import Plan from '../../Plan/components/Plan';

const CURRENT_PERSONAL_PLAN = gql`
    query GET_USER_PLAN ($upid: UID!) {
        userPlan (upid: $upid) {
            id
            joinDate
            startDate
            endDate
            privacy
            canEdit
            isCompleted
            plan {
                ...PlanCardInfo
                isFixedDated
            }
            user {
               id
               firstName
            thumbs {
                small
                large
                medium
            }
               lastName
            }
        }
    }
    ${Plan.fragments.plan}
`;


// 1- add queries:
const PlanstorPlanLayoutWithQuery = graphql(
    CURRENT_PERSONAL_PLAN,
    {
        options: (ownProps) => ({
            variables: {
                upid: ownProps.match.params.upid
            }

        }),
        props: ({ ownProps, data }) => {

            if (!data.loading) {


                return {
                    info: data.userPlan,
                    plan: data.userPlan.plan,
                    user: data.userPlan.user,
                    //modules: data.network.modules,
                    loading: data.loading,
                    /*increment() {
                         ownProps.increment(data.plans['actionplans']);
                    },
                    doubleAsync() {
                         // reset list of plans
                        ownProps.increment([]);
                    }*/
                }

            } else {
                return {loading: data.loading}
            }
        },
    }
)(PlanLayout);


export default PlanstorPlanLayoutWithQuery;