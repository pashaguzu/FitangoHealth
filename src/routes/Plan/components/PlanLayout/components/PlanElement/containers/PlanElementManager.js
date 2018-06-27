import { graphql } from 'react-apollo';

import PlanElementManagerWithMutations from './PlanElementManagerMutations';
import {GET_PLAN_ELEMENT_QUERY} from "./queries";


export const PlanElementWithQuery = graphql(
    GET_PLAN_ELEMENT_QUERY,
    {
        options: (ownProps) => ({
            skip: !ownProps.id,
            variables: {
                id: ownProps.id || '',
                planId: ownProps.planId,
            },
            //fetchPolicy: !ownProps.id ? 'cache-only' : undefined,
        }),
        props: ({ownProps, data}) => {
            //return {loading:true};
            if (!data.loading) {

                const {planElement={}} = data;
                const {type} = planElement;
                return {
                    element: planElement,
                    type: type || ownProps.type,
                    loading: data.loading,
                    data:data,
                    /*loadDate(date) {

                        return data.fetchMore({
                            // query: ... (you can specify a different query. FEED_QUERY is used by default)
                            variables: {
                                // We are able to figure out which offset to use because it matches
                                // the feed length, but we could also use state, or the previous
                                // variables to calculate this (see the cursor example below)
                                //id: ownProps.id,
                                //upid: ownProps.upid,
                                date: date,
                            },
                            updateQuery: (previousResult, {fetchMoreResult}) => {
                                //return {medicationPlan:{id:29}};

                                //fetchMoreResult.date = date;
                                if (!fetchMoreResult) { return previousResult; }
                                return fetchMoreResult;
                            },
                        });
                    }*/
                }
            } else {
                return {loading: data.loading, data:data}
            }
        },
    }
);


export default PlanElementWithQuery(PlanElementManagerWithMutations);
