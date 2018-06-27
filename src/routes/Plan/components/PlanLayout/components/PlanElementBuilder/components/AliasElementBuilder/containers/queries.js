import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {PlanElementPureFragment} from "../../../../../../Plan/fragments";


const PB_PLAN_BODY_QUERY = gql`
    query PB_PATHWAY_BODY ($id: UID!) {
        getPathway (id: $id) {
            id
            elements {
                ...PlanElement,
            }
        }
    }
    ${PlanElementPureFragment}
`;


// 1- add queries:
export const PathwayBodyWithQuery = graphql(
    PB_PLAN_BODY_QUERY,
    {
        options: (ownProps) => {
            return {
                variables: {
                    id: ownProps.planId,
                }}
        },
        props: ({ ownProps, data }) => {
            if (data.getPathway && !data.loading) {
                const pathway = data.getPathway;
                return {
                    loading: data.loading,
                    elements: pathway.elements,
                }

            } else {
                return {loading: data.loading}
            }
        },
    }
);