/**
 * Created by Pavel on 20.12.2017.
 */
import { connect } from 'react-redux'
import Content  from '../components'

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Plan from 'routes/Plan/components/Plan';

import {setSearch} from "../../../../../modules";


const QUERY = gql`
     query GET_PLANSTORE_PLANS ($filters: PlanstorePlanFilterInput, $page: Int!, $limit: Int, $search: String) {
        planstore {
            plans (filters: $filters, page: $page, limit: $limit, search: $search) {
                totalCount
                edges {
                    ...PlanCardInfo
                    ribbon
                }
            }
          }
    }${Plan.fragments.plan}
`;

const PLANS_PER_PAGE = 20;

// 1- add queries:
const PlanstoreLayoutWithQuery = graphql(
    QUERY,
    {
        options: (ownProps) => ({

            variables: {
                filters:ownProps.activeFilters,
                page: ownProps.page,
                limit: PLANS_PER_PAGE,
                search: ownProps.search,
            },
            fetchPolicy: 'cache-first'

        }),
        props: ({data }) => {
            if (!data.loading) {
                const {edges, totalCount/*, pageInfo: {endCursor}*/} = data.planstore.plans;
                console.log(edges.length);
                console.log(totalCount);
                return {

                    plans: edges,
                    total: totalCount,
                    hasMore: edges.length < totalCount,
                    //endCursor: endCursor,
                    loading: data.loading,



                    loadMore(page, endCursor, callback) {
                        return data.fetchMore({
                            variables: {
                                page:page,
                               // cursors: {before: endCursor, last:10}
                            },
                            updateQuery: (previousResult, { fetchMoreResult }) => {

                                callback();
                                if (!fetchMoreResult) { return previousResult; }


                                const newMessages = [...previousResult.planstore.plans.edges, ...fetchMoreResult.planstore.plans.edges]
                                //console.log(newMessages);

                                const obj =  Object.assign({}, previousResult, {
                                    planstore: {
                                        ...previousResult.planstore, plans: {
                                            ...previousResult.planstore.plans,
                                            edges: newMessages
                                        }
                                    }
                                    /*
                                    account: {
                                    ...previousResult.account, user: {
                                        ...previousResult.account.user, notifications: {
                                            ...previousResult.account.user.notifications,
                                            edges: newMessages
                                        }
                                    }
                                }
                                     */
                                });

                                return obj;
                            },
                        });
                    },

                    loadMoreEntries(page) {

                        return data.fetchMore({
                            // query: ... (you can specify a different query. FEED_QUERY is used by default)
                            variables: {
                                // We are able to figure out which offset to use because it matches
                                // the feed length, but we could also use state, or the previous
                                // variables to calculate this (see the cursor example below)
                                page: page,
                            },
                            updateQuery: (previousResult, {fetchMoreResult}) => {

                                if (!fetchMoreResult) { return previousResult; }
                                return fetchMoreResult;
                            },
                        });
                    }
                }
            }
            else {
                return {loading: data.loading, plans: []}
            }
        },
    }
)(Content);

/* -----------------------------------------
 Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
    var activeFilters = state.planstore.get('activeFilters').toJS();
    var plans = state.planstore.get('plans').toJS();
    var page = state.planstore.get('page');
    var search = state.planstore.get('search');
    return {
        plans: plans,
        activeFilters: activeFilters,
        page: page,
        search: search,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateSearchStore: (value)  => {
        dispatch(setSearch(value))
    }
});


export default connect(
    mapStateToProps, mapDispatchToProps
)(PlanstoreLayoutWithQuery);