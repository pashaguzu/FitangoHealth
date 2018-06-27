import DecisionElementActions from '../components/DecisionElementActions';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import {GET_PLAN_ELEMENT_QUERY} from "../../../../../containers/queries";

const PlanElementManagerWithQuery = graphql(
    GET_PLAN_ELEMENT_QUERY,
    {
        options: (ownProps) => ({
            skip: !ownProps.id,
            variables: {
                id: ownProps.id,
                planId: ownProps.planId,
            }
        }),
        props: ({data}) => {
            if (!data.loading) {

                const {planElement} = data;
                const {type} = planElement;

                return {
                    details: data.planElement.itemInfo,
                    type: type,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
);


export default PlanElementManagerWithQuery(DecisionElementActions);

