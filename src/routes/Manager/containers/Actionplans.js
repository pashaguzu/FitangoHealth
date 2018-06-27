import Actionplans from '../components/Actionplans';
import React from 'react';
import {compose,withStateHandlers} from 'recompose';
import {PlanCardFragment} from '../../Plan/components/Plan/fragments';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const ActionPlans_QUERY = gql`    
    query GET_PLANSTORE_ACTIONPLANS {
            planstore {
                plans {
                    totalCount
                    edges {
                        ...PlanCardInfo
                    }
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
                /*variables: {
                    user_id: ownProps.user_id,
                    status: 'active'
                    //date:ownProps.date
                },*/
                fetchPolicy: 'network-only'
            }

        },
        props: ({ ownProps, data }) => {
            if (!data.loading) {
console.log(data.planstore.plans);
                return {
                    plans: data.planstore.plans.edges,
                    plansTotal: data.planstore.plans.totalCount,
                    loading: data.loading,
                    loadByStatus(status) {
                        return data.fetchMore({
                            // query: ... (you can specify a different query. FEED_QUERY is used by default)
                            variables: {
                                user_id:ownProps.user_id,
                                status:status
                            },
                            updateQuery: (previousResult, {fetchMoreResult}) => {
                                if (!fetchMoreResult) { return previousResult; }
                                return fetchMoreResult;
                            },
                        });
                    },
                    loadMoreEntries() {

                        return data.fetchMore({
                            // query: ... (you can specify a different query. FEED_QUERY is used by default)
                            variables: {
                                // We are able to figure out which offset to use because it matches
                                // the feed length, but we could also use state, or the previous
                                // variables to calculate this (see the cursor example below)
                                page: ownProps.page+1,
                            },
                            updateQuery: (previousResult, {fetchMoreResult}) => {
                                if (!fetchMoreResult) { return previousResult; }

                                return fetchMoreResult;
                                return Object.assign({}, previousResult, {
                                    // Append the new feed results to the old one
                                    planstore: {plans: [...previousResult.planstore.plans, ...fetchMoreResult.planstore.plans]},
                                });
                            },
                        });
                    }
                }

            } else {
                return {loading: data.loading}
            }
        },
    }
);
const enhance = compose(
    withQuery,
    withStateHandlers(
        (props) => (
            {
            searchText: '',
        }),
        {        
            onSearch: ({searchText},props) =>(value) => (
                {
                    searchText: value.target.value,
                    plans: props.plans.map((record) => {
                        const match = record.title.match(new RegExp(searchText, 'gi'));
                        if (!match) {
                            return null;
                        }                        
                        return {
                            ...record,
                            title: (
                                <span>
                      {record.title.split( new RegExp(searchText, 'gi')).map((text, i) => (
                      i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                      ))}
                    </span>
                            ),
                        };
                    }).filter(record => !!record),
            }),
            emitEmpty: ({searchText}) =>(value) => (
                {
                    searchText: ''
                     })
            })        

);
export default enhance(Actionplans);