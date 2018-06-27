/**
 * Created by Павел on 17.02.2018.
 */

//import React from 'react'
import { connect } from 'react-redux'

import Profile from '../components/Profile';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const GET_PROFILE  = gql`
 query GET_PROFILE($user_id:UID) {
  user(id: $user_id) {
    id
    fullName
    thumbs {
      original
      small
      large
      medium
      wide
    }
    motivation {
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
      adherenceSummary {
        medications {
          level
          color
          description
        }
      }
    }
  }
}


`;

const withQuery = graphql(GET_PROFILE, {
    options: (ownProps) => {
        return{
            variables: {
                user_id:ownProps.match.params.uid
            }
        }
    },
    props: ({ data }) => {
        if (!data.loading) {
            return {
                info: data.user,
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

export default withQuery(connect(mapStateToProps, mapDispatchToProps)(Profile));