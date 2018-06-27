/**
 * Created by Pavel on 08.12.2017.
 */
//import React from 'react'
import { connect } from 'react-redux'


/*  This is a container components. Notice it does not contain any JSX,
 nor does it import React. This components is **only** responsible for
 wiring in the actions and state necessary to render a presentational
 components - in this case, the counter:   */

import Family from '../components/Family';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


export const GET_FAMILY_QUERY  = gql`
   query GET_FAMILY {
        account {
            user {
            id
            motivation{
            family {
                    totalCount,
                  edges{
                    id,
                    user {
                      id,
                      firstName,
                       thumbs {
                small
                large
                medium
            },
                      email
                    }
                  }
                }
            }
            }
         }
     }
`;

const withMutation = graphql(GET_FAMILY_QUERY, {
    props: ({  data }) => {
        if (!data.loading) {
            return {
                info: data.account.user.motivation,
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

    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export default withMutation(connect(mapStateToProps, mapDispatchToProps)(Family));