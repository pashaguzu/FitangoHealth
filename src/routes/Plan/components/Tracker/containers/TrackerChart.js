import { connect } from 'react-redux'
import { PlansList } from '../components/'

import Plan from '../components/Plan';


import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const QUERY = gql`
    query GET_USER_PLANS ($user_id:UID)  {
        account {
            plans (user_id: $user_id)  {
                ...PlanCardInfo
                upid
            }
        }
    }
    ${Plan.fragments.plan}
`;


// 1- add queries:
const PlansListWithQuery = graphql(
  QUERY,
  {
    //name: 'PlanstorePlans',
    options: (ownProps) => ({
      variables: {
          user_id:ownProps.user_id,
          //date:ownProps.date
      },
       // fetchPolicy: 'network-only'

    }),
    props: ({ ownProps, data }) => {
      if (!data.loading) {

        return {
          plans: data.account.plans,
          //modules: data.network.modules,
          loading: data.loading,
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
          /*increment() {
               ownProps.increment(data.plans['actionplans']);
          },
          doubleAsync() {
               // reset list of plans
              ownProps.increment([]);
          }*/
        }

      } else {
        return {loading: data.loading}
      }
    },
  }
)(PlansList);

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {


  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlansListWithQuery);