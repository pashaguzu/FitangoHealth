/**
 * Created by Павел on 17.01.2018.
 */

//import React from 'react'
import { connect } from 'react-redux'
import Search from '../components/Search';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const CATEGORYSEARCH  = gql`
   query CATEGORY_SEARCH($search:String) {
        categorySearch(search:$search) {
             id
             name
        }
}

`;

const withQuery = graphql(CATEGORYSEARCH, {

    options: (ownProps) => {
        return{
            variables: {
                search:ownProps.search
            }
        }
    },
    props: ({  data }) => {
        if (!data.loading) {

            let keyValue = [];
            data.categorySearch.forEach((item)=>{
                keyValue.push({value:item.id, text:item.name});
            })

            return {
                items: keyValue,
                loading: data.loading,
                loadMoreEntries(inputValue) {
                    return data.fetchMore({

                        variables: {
                            search: inputValue,
                        },
                        updateQuery: (previousResult, {fetchMoreResult}) => {
                            if (!fetchMoreResult) { return previousResult; }
                            return fetchMoreResult;
                        },
                    });
                }
            }
        }
        else {
            return {loading: data.loading}
        }
    },

});

const mapStateToProps = (state) => {
    return {
        search: '',
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmit: (values) => {

    },
});


export default withQuery(connect(mapStateToProps, mapDispatchToProps)(Search));