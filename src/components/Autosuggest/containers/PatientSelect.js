import PatientSelectPURE from '../components/PatientSelect';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {UserInfoFragment} from "../../../routes/User/fragments";

export const PEOPLE_LIST_QUERY = gql`
    query GET_PATIENTS_LIST ($search: String) {
        management {
            getPatients (search:$search) {
                edges {
                    id
                    firstName
                    lastName
                    fullName
                    genderText
                    age
                    memberId
                }
                totalCount
            }
        }
    }
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
                    items: data.management.getPatients.edges,
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
)(PatientSelectPURE);

export default PeopleWithQuery;
export const PatientSelect = PeopleWithQuery;