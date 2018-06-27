import { connect } from 'react-redux'

import Select from '../components'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const trackersList = gql`
   query GET_TRACKERS_LIST ($userId: UID, $search: String)  {
            trackersList (userId: $userId, search: $search) {
                id
                label
                units {
                    id
                    name
                }
                 }
    }
`;
const trackersMutate=gql`
 mutation settingUser( $input:AccountInput!){
        account(input:$input) {
          user {
            first_name
          }
        }
    }
`;

const withQuery = graphql(trackersList,
    {
        props: ({ ownProps, data }) => {
            if (!data.loading) {
                console.log(data);
                return {
                    trackers: data.trackersList,
                    loading: data.loading,

                    trackerSearch(search) {
                        return data.fetchMore({
                            variables: {
                                search: search,
                            },
                            updateQuery: (previousResult, {fetchMoreResult}) => {

                                if (!fetchMoreResult) { return previousResult; }
                                return fetchMoreResult;
                            },
                        });
                    }
                }

            } else {
                return {loading: data.loading}
            }
        },

    }
)(Select);

const withMutation = graphql(trackersMutate, {
    props: ({ mutate }) => ({
        trackerSearchInput: input => {
            return mutate({
                variables: {input: {user:input}},
            })},
    }),
});




const mapStateToProps = (state) => {

    return {
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
});


export default withMutation(connect(
    mapStateToProps,
    mapDispatchToProps
)(withQuery));