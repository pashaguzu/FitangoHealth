//import React from 'react'


import NotificationBadge from '../components/NotificationBadge';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


export const BADGE_NOTIFICATIONS_QUERY  = gql`
  query GET_NOTIFICATIONS ($cursors: CursorInput!) {
  account {
    user {
      id
      notifications (cursors:$cursors, unread:true, generalTotal:true) @connection(key: "notifications", filter: ["generalTotal"]) {
        totalCount
        edges {
          id
          sender {
            id
            firstName
            thumbs {
                small
                large
                medium
            }
            color
          }
          patient {
            id
          }
          text
          isApproved
          dateSent
          isCritical
        }
      }
    }
  }
}

`;

const withQuery = graphql(BADGE_NOTIFICATIONS_QUERY, {
    options: (ownProps) => {

        return {
            //skip: ownProps.loading,// skip query if loading
            variables: {
                cursors: {after: ownProps.lastCursor}
            },
            fetchPolicy: ownProps.loadNew ? 'network-only' : 'cache-only'
        }
    },
    props: ({ ownProps, data }) => {

        const newNotifications = data.account ? data.account.user.notifications : [];
        const totalNewNotifications =  data.account ? data.account.user.notifications.totalCount : 0;

        return {loading: data.loading, newNotifications:newNotifications, totalNewNotifications:totalNewNotifications}
    },
});

export default withQuery(NotificationBadge);