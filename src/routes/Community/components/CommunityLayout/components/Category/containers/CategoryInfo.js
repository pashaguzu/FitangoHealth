/**
 * Created by Pavel on 10.01.2018.
 */
//import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'react-apollo';
import {message} from 'antd';

import CategoryInfo from '../components/CategoryInfo';
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
      }
}
`;

const withQuery = graphql(CATEGORY, {
    options: (ownProps) => {
        console.log(ownProps.id);
        return {
            variables: {
                id: ownProps.id,
                // handleBreadcrumbChange: ownProps.handleBreadcrumbChange
            }
        }
    },
    props: ({ownProps, data}) => {

        if (!data.loading) {
            console.log(data);
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
export default withQuery(CategoryInfo);
