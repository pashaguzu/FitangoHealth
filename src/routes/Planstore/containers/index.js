import { connect } from 'react-redux'
import PlanstoreLayout  from '../components/PlanstoreLayout'
import Plan from '../../Plan/components/Plan';


import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const QUERY = gql`
     query GET_PLANSTORE_DASH ($filters: PlanstorePlanFilterInput, $page: Int!, $limit: Int) {
        planstore {
            plans (filters: $filters, page: $page, limit: $limit) {
                totalCount
                edges {
                    ...PlanCardInfo
                }
            }
            filters {
                code
                name
                fields {
                   range {
                        min
                        max
                    }
                    items {
                        label
                        value
                    }
                }
            }
        }
    }
    ${Plan.fragments.plan}
`;

const PLANS_PER_PAGE = 20;

// 1- add queries:
const PlanstoreLayoutWithQuery = graphql(
    QUERY,
    {
        options: (ownProps) => ({

            variables: {
                filters: ownProps.activeFilters,
                page: ownProps.page,
                limit: PLANS_PER_PAGE,
            },
            fetchPolicy: 'network-only'

        }),
        props: ({ data }) => {

            if (!data.loading) {

                return {

                    //plans: data.planstore.plans,
                    //filters: data.planstore.filters,
                    loading: data.loading,
                  }
            } else {
                return {loading: data.loading}
            }
        },
    }
)(PlanstoreLayout);

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
    //var activeFilters = state.planstore.get('activeFilters').toJS();
    //var plans = state.planstore.get('plans').toJS();
    var page = state.planstore.get('page');
    return {
        //plans: plans,
        //activeFilters: activeFilters,
        page: page,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlanstoreLayoutWithQuery);