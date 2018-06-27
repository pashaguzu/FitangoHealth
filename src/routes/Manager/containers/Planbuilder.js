import Planbuilder from '../components/Planbuilder';
import {PlanCardFragment} from '../../Plan/components/Plan/fragments';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const ActionPlans_QUERY = gql`    
    query GET_PLANBUILDER_PLAN ($id: UID) {
            plan (id:$id) {
                ...PlanCardInfo
                type
                schedule {
                  type
                  startDate
                  endDate
                  limitStartDow
                  relativeEndDay
                  dows
                }
            }
    }
    ${PlanCardFragment}
`;

// 1- add queries:
const withQuery = graphql(
    ActionPlans_QUERY,
    {
        //name: 'PlanstorePlans',
        options: (ownProps) => {
            return {
                skip: !ownProps.match.params.id,
                variables: {
                    id: ownProps.match.params.id,
                },
                fetchPolicy: 'network-only'
            }

        },
        props: ({ ownProps, data }) => {
            if (!data.loading) {
                return {
                    plan: data.plan,
                    type:data.plan.type,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
);



export default withQuery(Planbuilder);