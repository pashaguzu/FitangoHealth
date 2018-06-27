/**
 * Created by Павел on 12.02.2018.
 */
//import React from 'react'
import { connect } from 'react-redux'

import Commitments from '../components/Commitments';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const COMMITMENTS  = gql`
 query GET_COMMITMENTS($cursors: CursorInput,$userId:UID) {

    user (id: $userId) {
      id
      motivation {
        commitments(cursors: $cursors) {
          totalCount
          edges {
            id
            formattedText
            motivators {
              id
              user {
                id
                firstName
            thumbs {
                small
                large
                medium
            }
              }
              email
            }
            date
            donate
            payment
            url
            description
            action
          }
        }
      }
    }
  }


`;

const withMutation = graphql(COMMITMENTS, {
    options: (ownProps) => ({

        variables: {
            user_id: ownProps.userId
        }

    }),
    props: ({  data }) => {
        if (!data.loading) {
            return {
                info: data.user.motivation,
                // motivators: data.user.motivation.motivators,
                loading: data.loading
            }
        }
        else {
            return {loading: data.loading}
        }
    },
});

const mapStateToProps = (state) => {
    return{
        userId:state.user.info.id
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export default withMutation(connect(mapStateToProps, mapDispatchToProps)(Commitments));