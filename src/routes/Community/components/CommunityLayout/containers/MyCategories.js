
/**
 * Created by Pavel on 10.01.2018.
 */
//import React from 'react'
import { connect } from 'react-redux'


import MyCategories from '../components/MyCategories';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const MY_CATEGORIES  = gql`
   query GET_MY_CATEGORIES {
        account {
            user {
            id
            categories
            {
              id
              category {
                id 
                name
                thumb {
                  large
                  original
                  small                  
                  medium
                  wide
                }
               
              }
            }
            }
          
     }
}
`;

const withMutation = graphql(MY_CATEGORIES, {
    props: ({ ownProps, data }) => {

        if (!data.loading) {
            return {
                info: data.account.user.categories,
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

export default withMutation(connect(mapStateToProps, mapDispatchToProps)(MyCategories));