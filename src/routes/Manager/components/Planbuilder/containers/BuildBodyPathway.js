import BuildBody from '../components/Pathway/BuildBody';
import {PlanElementPureFragment, PlanCardFragment} from "../../../../Plan/components/Plan/fragments";

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';



const PB_PLAN_BODY_QUERY = gql`
    query PB_PATHWAY_BODY ($id: UID!) {
        getPathway (id: $id) {
            id
            title
            description
            elements {
                ...PlanElement,
            }
        }
    }
    ${PlanElementPureFragment}
`;


// 1- add queries:
const BuildBodyWithQuery = graphql(
    PB_PLAN_BODY_QUERY,
    {
        options: (ownProps) => {
            return {
            variables: {
                id: ownProps.plan.id,
            }}
        },
        props: ({ ownProps, data }) => {
            if (data.getPathway && !data.loading) {
                const pathway = data.getPathway;
                return {
                    //upid: data.plan.upid,
                    //modules: data.network.modules,
                    loading: data.loading,
                    planId: pathway.id,
                    elements: pathway.elements,
                }

            } else {
                return {loading: data.loading}
            }
        },
    }
)(BuildBody);

export default BuildBodyWithQuery;