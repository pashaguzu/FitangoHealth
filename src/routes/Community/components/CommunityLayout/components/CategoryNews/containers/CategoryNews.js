
/**
 * Created by Pavel on 10.01.2018.
 */
//import React from 'react'
import { connect } from 'react-redux'


import CategoryNews from '../components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const MY_CATEGORIES  = gql`
  query GET_MAINCATEGORIESNEWS {
  getMainCategoriesNews{
    totalCount
    edges{
      id
      title
      text
      createdAt
      thumb
    }
  }
}
`;

const withMutation = graphql(MY_CATEGORIES, {
    props: ({ ownProps, data }) => {
        if (!data.loading) {
            return {
                info: data.getMainCategoriesNews,
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

export default withMutation(connect(mapStateToProps, mapDispatchToProps)(CategoryNews));