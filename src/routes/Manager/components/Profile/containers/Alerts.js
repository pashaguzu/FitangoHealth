import Alerts from '../components/Alerts';
import {compose} from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {UserInfoFragment} from "../../../../User/fragments";
//import {withNotificationsQuery} from "../../../../../layouts/components/Header/containers/Notifications";


const GET_PATIENT_ALERTS_QUERY  = gql`
 query GET_USER_ALERTS($user_id:UID, $cursors: CursorInput, $criticalOnly: Boolean) {
  patient(id: $user_id) {
     id
     notifications (cursors:$cursors, criticalOnly:$criticalOnly) {
        totalCount
        edges {
          id
          sender {
            ...UserInfo
          }
          patient {
            ...UserInfo
          }
          text
          isApproved
          isRequest
          dateSent
          isCritical
        }
        pageInfo {
            endCursor
        }
      }
    }
  }

${UserInfoFragment}
`;

const withQuery = graphql(GET_PATIENT_ALERTS_QUERY, {
    options: (ownProps) => {
        return{
            variables: {
                user_id:ownProps.user.id,
                criticalOnly:true
            }
        }
    },
    props: ({ data }) => {

        const {patient={}} = data;
        const {notifications={}} = patient;
        const {edges=[]} = notifications;

        return {loading: data.loading, notifications:edges }
    },
});


const enhance = compose(
    withQuery
);

export default enhance(Alerts);