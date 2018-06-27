import BuildHeader from '../components/BuildHeader/pathway';
import {PathwayCardFragment} from '../../../../Plan/components/Plan/fragments';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';


export const ActionPlans_QUERY = gql`    
    query GET_PLANBUILDER_PATHWAY ($id: UID) {
            getPathway (id:$id) {
                ...PathwayCardInfo
                cancer {
                    id
                }
            }
    }
    ${PathwayCardFragment}
`;

// 1- add queries:
const withQuery = graphql(
    ActionPlans_QUERY,
    {
        //name: 'PlanstorePlans',
        options: (ownProps) => {
            const {id=''} = ownProps.plan;
            return {
                skip: !id,
                variables: {
                    id: id,
                },
                //fetchPolicy: 'network-only'
            }

        },
        props: ({ ownProps, data }) => {
            if (!data.loading) {
                return {
                    plan: data.getPathway,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
);


const PlanUpdateMutation = gql`
    mutation PathwayUpdate($id: UID!, $input:PlanInput!){
        pathwayUpdate(id:$id, input:$input) {
            ...PathwayCardInfo
            cancer {
                    id
                }
        }
    }
     ${PathwayCardFragment}
`;

const withMutation = graphql(PlanUpdateMutation, {
    props: ({ ownProps, mutate }) => ({
        onUpdateSubmit: (input, submitCallback) => {
            return mutate({
                variables: { id: ownProps.plan.id, input: input}
            }).then(({data}) => {
                submitCallback(data.pathwayUpdate);
            });
        },
    }),
});


const PlanCreateMutation = gql`
    mutation PathwayCreate($input:PlanInput!){
        pathwayCreate(input:$input) {
            ...PathwayCardInfo
            cancer {
                    id
                }
        }
    }
     ${PathwayCardFragment}
`;


export const withAddMutation = graphql(PlanCreateMutation, {
    props: ({ ownProps, mutate }) => ({
        onCreateSubmit: (input, submitCallback) => {
            return mutate({
                variables: {input:input},
            }).then(({data}) => {
                submitCallback(data.pathwayCreate);
            });
        },
    }),
});

export const withMutations = compose(
    withMutation,
    withAddMutation,
);


export default withMutations(withQuery(BuildHeader));