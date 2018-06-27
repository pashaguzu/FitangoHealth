/**
 * Created by Pavel on 08.12.2017.
 */
//import React from 'react'
import { connect } from 'react-redux'


/*  This is a container components. Notice it does not contain any JSX,
 nor does it import React. This components is **only** responsible for
 wiring in the actions and state necessary to render a presentational
 components - in this case, the counter:   */

import CareTeam from '../components/CareTeam';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
const CARETEAM  = gql`
   query GET_CARETEAM {
        account {
            user {
            id
              motivation{
            careTeam {
                    totalCount,
                  edges{
                    id,
                    user {
                      id,
                      firstName,
                      email
                    }
                  }
                }
            }}
         }
     }
`;
const withMutation = graphql(CARETEAM, {
    props: ({ data }) => {
        if (!data.loading) {
            console.log("----data2-----",data.account.user);

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

export default withMutation(CareTeam);