import PeoplePure from '../components/PeopleSelect';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {UserInfoFragment} from "../../../routes/User/fragments";

export const PEOPLE_LIST_QUERY = gql`
    query GET_PEOPLE_LIST ($search: String) {
        getPeople (search:$search) {
            totalCount
            edges {
                ...UserInfo
            }
        }
    }
    ${UserInfoFragment}
`;

const PeopleWithQuery = graphql(PEOPLE_LIST_QUERY,
    {
        options: () => {
            return {
                //fetchPolicy: 'network-only'
            }
        },
        props: ({ data }) => {
            if (!data.loading) {
                return {
                    items: data.getPeople.edges,
                    loading: data.loading,

                    doSearch(search) {
                        return data.fetchMore({
                            variables: {
                                search: search,
                            },
                            updateQuery: (previousResult, {fetchMoreResult}) => {
                                if (!fetchMoreResult) { return previousResult; }
                                return (fetchMoreResult);
                            },
                        });
                    }
                }
            } else {
                return {loading: data.loading}
            }
        },

    }
)(PeoplePure);

export default PeopleWithQuery;
export const PeopleSelect = PeopleWithQuery;