import { connect } from 'react-redux'
import Slider  from '../components'

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {setFilters,clearFilters} from '../../../../../modules'

const QUERY = gql`
     query GET_PLANSTORE_FILTERS {
        planstore {
               filters {
                code
                name
                fields {
                    type
                    label
                    value
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
`;

// 1- add queries:
const PlanstoreLayoutWithQuery = graphql(
    QUERY,
    {
        options: (ownProps) => ({
            /*variables: {
                filters:ownProps.activeFilters,
                page: ownProps.page,
                limit: PLANS_PER_PAGE,
            },
            fetchPolicy: 'cache-first'*/
        }),
        props: ({ ownProps, data }) => {

            if (!data.loading) {
                //console.log(data);
                return {
                    filters: data.planstore.filters,
                    loading: data.loading,
                }
            }

            else {
                return {loading: data.loading, filters: []}
            }
        },
    }
)(Slider);

/* -----------------------------------------
 Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
    var activeFilters = state.planstore.get('activeFilters').toJS();
    return {
        activeFilters: activeFilters,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateFilterStore: (info)  => {
        dispatch(setFilters(info))
    },
    updateZeroFilterStore: (info)  => {
        dispatch(clearFilters(info))
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlanstoreLayoutWithQuery);