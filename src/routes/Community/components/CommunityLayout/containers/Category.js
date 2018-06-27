/**
 * Created by Pavel on 10.01.2018.
 */
//import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'react-apollo';
import {message} from 'antd';

import Category from '../components/Category';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';


const CATEGORY = gql`
query GET_CATEGORY($id:UID) {
       category(id:$id) {
         id
         name
         thumb {
           original
           small
           large
           medium
           wide
         }
          news{
          totalCount
          edges{
            id
            title
            text
            thumb
          }
        }
         canJoin
         isJoined
         articles {
           id
          title
          titleShort
          text
          category {
            id
            name
          }
          thumbs {
            original
            small
            large
            medium
            wide
          }
          views
         }
        discussions {
          id
          title
          text
          createdAt
          lastReply {
            id
            date
            text
            author {
              id
              
            }
          }
          author {
            id
          }
          category {
            id
          }
          views
          replies {
            totalCount
          }
        }
        plans{
                id
                title
                description
                thumb {
                  original
                  small
                  large
                  medium
                  wide
                }
        }    
    categories {
      id
      name
        description
        thumb {
          original
          small
          large
          medium
          wide
        }
    }
       }
}
`;
const categoryJoinMutate = gql`
mutation CATEGORY_JOIN ($id:UID!,$uid:UID){
    categoryJoin(id:$id,uid:$uid)
  }

`;

const categoryUnjoinMutate = gql`
mutation CATEGORY_UNJOIN ($id:UID!,$uid:UID){
    categoryUnjoin(id:$id,uid:$uid)
  }

`;
const withQuery = graphql(CATEGORY, {

    options: (ownProps) => {
        console.log(ownProps);
        return {
            variables: {
                id: ownProps.match.params.id,
                // handleBreadcrumbChange: ownProps.handleBreadcrumbChange
            }
        }
    },
    props: ({ownProps, data}) => {

        if (!data.loading) {
            return {
                info: data.category,
                loading: data.loading
            }
        }
        else {
            return {loading: data.loading}
        }
    },

});

const withMutation = graphql(categoryJoinMutate, {
    props: ({mutate}) => ({
        categoryJoin: id => {
            return mutate({
                variables: {id: id},
                update: (store, {data: {categoryJoin}}) => {

                    // get info from the store
                    const data = store.readQuery({
                        query: CATEGORY,
                        variables: {
                            id: id,
                        }
                    });

                    // Write our data back to the cache.
                    store.writeQuery({
                        query: CATEGORY,
                        data: {
                            category: {
                                ...data.category,
                                isJoined: true
                            }
                        },
                        variables: {
                            id: id,
                        }
                    });
                },
            })
        },
    }),
});

export const withMutationUnjoin = graphql(categoryUnjoinMutate, {
    props: ({mutate}) => ({
        categoryUnjoin: id => {
            return mutate({
                variables: {id: id},
                update: (store, {data: {categoryUnjoin}}) => {

                    // get info from the store
                    const data = store.readQuery({
                        query: CATEGORY,
                        variables: {
                            id: id,
                        }
                    });

                    // Write our data back to the cache.
                    store.writeQuery({
                        query: CATEGORY,
                        data: {
                            category: {
                                ...data.category,
                                isJoined: false
                            }
                        },
                        variables: {
                            id: id,
                        }
                    });
                },
            })
        },
    }),
});

const mapStateToProps = (state) => {

    return {};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmit: (id) => {
        ownProps.categoryJoin(id).then(({data}) => {
            message.success('Joined Community');
        })
    },
    onClick: (id) => {
        ownProps.categoryUnjoin(id).then(({data}) => {
            message.warning('Left Community');
        })
    },
});

export default compose(withQuery, withMutation, withMutationUnjoin, connect(mapStateToProps, mapDispatchToProps))((Category));
