import BuildHeader from '../components/BuildHeader';
import {PlanCardFragment} from '../../../../Plan/components/Plan/fragments';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

export const ActionPlans_QUERY = gql`    
    query GET_PLANBUILDER_PLAN ($id: UID) {
            plan (id:$id) {
                ...PlanCardInfo
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
                //skip: !ownProps.ready,
                variables: {
                    id: ownProps.plan.id,
                },
                fetchPolicy: 'cache-only'
            }

        },
        props: ({ ownProps, data }) => {
            if (!data.loading) {
                return {
                    plan: data.plan,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
);



const PlanUpdateMutation = gql`
    mutation PlanUpdate($id: UID!, $input:PlanInput!){
        planUpdate(id:$id, input:$input) {
            ...PlanCardInfo
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

const withMutation = graphql(PlanUpdateMutation, {
    props: ({ ownProps, mutate }) => ({
        onUpdateSubmit: (input, submitCallback) => {
            return mutate({
                variables: { id: ownProps.plan.id, input: input}
            }).then(({data}) => {
                submitCallback(data.planUpdate);
            });
        },
    }),
});


const PlanCreateMutation = gql`
    mutation PlanCreate($input:PlanInput!){
        planCreate(input:$input) {
            ...PlanCardInfo
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


export const withAddMutation = graphql(PlanCreateMutation, {
    props: ({ ownProps, mutate }) => ({
        onCreateSubmit: (input, submitCallback) => {
            return mutate({
                variables: {input:input},
            }).then(({data}) => {
                submitCallback(data.planCreate);
            });
        },
    }),
});

export const withMutations = compose(
    withMutation,
    withAddMutation,
);




export default withMutations((BuildHeader));//withQuery