/**
 * Created by Pavel on 08.12.2017.
 */
//import React from 'react'
import { connect } from 'react-redux'


/*  This is a container components. Notice it does not contain any JSX,
 nor does it import React. This components is **only** responsible for
 wiring in the actions and state necessary to render a presentational
 components - in this case, the counter:   */

import Motivation from '../components/Motivation';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const MOTIVATION  = gql`
   query GET_ALLMOTIVATION($cursors: CursorInput, $userId:UID) {
  user(id: $userId) {
    id
    motivation {
      adherenceSummary {
        medications {
          level
          color
          description
        }
        trackers {
          level
          color
          description
        }
        plans {
          level
          color
          description
        }
      }
      badges(cursors: $cursors) {
        totalCount
        edges {
          id
          dateReceived
          badge {
            id
            title
            description
            congratsMessage
            image
            amount
          }
        }
      }
      motivators {
        totalCount
        edges {
          id
          user {
            id
            firstName
            thumbs {
                small
                large
                medium
            }
            email
          }
        }
      }
      commitments(cursors: $cursors) {
        totalCount
        edges {
          id
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
        }
      }
      iMotivate(cursors: $cursors) {
        totalCount
        edges {
          id
          user {
            id
            fullName
            thumbs {
              original
              small
              large
              medium
              wide
            }
          }
          email
        }
      }
      currentLevel {
        points
        info {
          id
        }
        nextLevel {
          title
          amount
        }
      }
      promises(cursors: $cursors) {
        totalCount
        edges {
          id
          date
          type
          url
          description
          sender {
            id
            firstName
            thumbs {
                small
                large
                medium
            }
          }
        }
      }
    }
  }
}

`;

const withMutation = graphql(MOTIVATION, {
    options: (ownProps) => ({

        variables: {
            user_id: ownProps.userId
        }

    }),
    props: ({  data }) => {
        if (!data.loading) {
            return {
                info: data.user.motivation,
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

export default withMutation(connect(mapStateToProps, mapDispatchToProps)(Motivation));