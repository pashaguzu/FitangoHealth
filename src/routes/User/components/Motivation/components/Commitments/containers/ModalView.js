/**
 * Created by Павел on 12.02.2018.
 */

import { connect } from 'react-redux'

import ModalView from '../components/ModalView';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const GET_PLANS  = gql`
query GET_TITLE_PLAN($userId: UID, $upid: UID) {
  userPlan(id: $userId, upid: $upid) {
    id
    plan {
      id
      title
    }
  }
}

`;

const withMutation = graphql(GET_PLANS, {
    options: (ownProps) => ({
        variables: {
            user_id: ownProps.userId,
            upid: ownProps.id
        }

    }),
    props: ({ ownProps, data }) => {
        if (!data.loading) {
            return {
                title: data.userPlan.plan.title,
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

export default withMutation(connect(mapStateToProps, mapDispatchToProps)(ModalView));