/**
 * Created by Павел on 12.02.2018.
 */
//import React from 'react'
import { connect } from 'react-redux'

import ModalPointsHistory from '../components/ModalPointsHistory';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const GET_POINTHISTORY  = gql`
query GET_POINTHISTORY($cursors:CursorInput) {
account{
  user{
    id
    motivation{
     pointsHistory(cursors:$cursors){
      totalCount
      edges{
        id
        info {
          id
          title
          amount
        }
        amountReceived
        dateReceived
      }
      }
    }
  }
}
}
`;

const withMutation = graphql(GET_POINTHISTORY, {
    props: ({  data }) => {

        if (!data.loading) {
            return {
                pointsHistory: data.account.user.motivation.pointsHistory,
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

export default withMutation(connect(mapStateToProps, mapDispatchToProps)(ModalPointsHistory));