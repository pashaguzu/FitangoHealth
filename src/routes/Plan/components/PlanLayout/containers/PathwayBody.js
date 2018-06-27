import PathwayBody from '../components/PathwayBody';
import {PlanElementPureFragment} from "../../../../Plan/components/Plan/fragments";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';




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


const injectPathwayBodyQuery = graphql(
    PB_PLAN_BODY_QUERY,
    {
        options: (ownProps) => {
            return {
                variables: {
                    id: ownProps.plan.id,
                }}
        },
        props: ({ data }) => {
            if (data.getPathway && !data.loading) {
                const pathway = data.getPathway;
                return {
                    loading: data.loading,
                    planId: pathway.id,
                    elements: pathway.elements,
                }

            } else {
                return {loading: data.loading}
            }
        },
    }
);


export default injectPathwayBodyQuery(PathwayBody);