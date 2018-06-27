/**
 * Created by Павел on 12.02.2018.
 */
//import React from 'react'
import { connect } from 'react-redux'

import SelectPlans from '../components/SelectPlans';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const GET_PLANS  = gql`
query GET_PLANS($user_id:UID) {
 user (id:$user_id) {
            id
            plans {
                id
                plan {
                    title
                    description              
                    progress
                }
            }
        }
}
`;

const withMutation = graphql(GET_PLANS, {
    options: (ownProps) => ({

        variables: {
            user_id: ownProps.userId
        }

    }),
    props: ({ data }) => {
        if (!data.loading) {
            return {
                info: data.user.plans,
                loading: data.loading
            }
        }
        else {
            return {loading: data.loading}
        }
    },
});

const mapStateToProps = (state) => {
    return {
        userId: state.user.info.id
    };

};

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export default withMutation(connect(mapStateToProps, mapDispatchToProps)(SelectPlans));