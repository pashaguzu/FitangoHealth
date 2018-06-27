/**
 * Created by Павел on 08.02.2018.
 */
/**
 * Created by Павел on 31.01.2018.
 */

//import React from 'react'
import { connect } from 'react-redux'


/*  This is a container components. Notice it does not contain any JSX,
 nor does it import React. This components is **only** responsible for
 wiring in the actions and state necessary to render a presentational
 components - in this case, the counter:   */
import {compose} from 'react-apollo';
import CommentModal from '../components/'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const DISCUSSION  = gql`
 query GET_DISCUSSION($id:UID) {
   user{
    id
  }
    discussion(id:$id) {
         id
         title
         text
         createdAt
         category {
           id
           isJoined
           canJoin
           name
         }
         author {
            id
         }
         views
         replies {
              totalCount
              edges{
                    id
                    text
                    date
                    createdAt
                    isImportant
                    unread
                    replies {
                      totalCount
                      edges{
                            id
                            text
                            date
                            createdAt
                            isImportant
                            unread
                      }
                  }    
              }
          }      
    }
}
`;
const discussionReply = gql`
   mutation discussionReply($id:UID!,$parentMessageId:UID,$message:String!) {
  discussionReply(id:$id,parentMessageId:$parentMessageId,message:$message) {
         id
         text
    createdAt
    isImportant
    unread
       }
}
`;

const withMutation = graphql(discussionReply, {
    props: ({ mutate, ownProps }) => ({
        discussionReply: (text,id,parentMessageId) => {
            return mutate({
                variables:  {
                    id: id,
                    message: text,
                    parentMessageId:parentMessageId
                },
                refetchQueries: [{
                    query: DISCUSSION,
                    variables: {id: id}
                }],
            }).then(({data})=>{
                ownProps.unshowModal();
            })
        },
    }),
});

const WithMutations = compose(
    withMutation
);
const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmit: (value) => {
        return ownProps.discussionReply(value.text,ownProps.match.params.id);
    }
});

export default WithMutations(connect(mapStateToProps, mapDispatchToProps)(CommentModal));