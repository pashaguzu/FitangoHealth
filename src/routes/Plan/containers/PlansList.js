import { connect } from 'react-redux'
import { PlansList } from '../components/PlansList'

import Plan from '../components/Plan';


import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const USER_PLANS_LIST_QUERY = gql`    
    query GET_USER_PLANS ($user_id:UID, $status:UserPlanStatusEnum)  {
            user (id:$user_id) {
              id
              plans (status: $status)  {
                  id
                  plan {
                    ...PlanCardInfo
                    progress
                  }
              }
            }
    }
    ${Plan.fragments.plan}
`;

//const PLANS_PER_PAGE = 20;

// 1- add queries:
const PlansListWithQuery = graphql(
    USER_PLANS_LIST_QUERY,
  {
    //name: 'PlanstorePlans',
    options: (ownProps) => {
        return {
            skip: !ownProps.ready,
            variables: {
                user_id: ownProps.user_id,
                status: 'active'
                //date:ownProps.date
            },
            // fetchPolicy: 'network-only'
        }

    },
    props: ({ ownProps, data }) => {
      if (!data.loading) {

        return {
          plans: data.user.plans,
          //modules: data.network.modules,
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
      activeUid: state.user.info.id
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