import ChemotherapyPure from '../components/ChemotherapySelect';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const CHEMOTHARAPY_LIST_QUERY = gql`
    query GET_CHEMOTHERAPY_LIST    {
        health {
            getChemotherapies   {
                totalCount
                edges {
                    id
                    title
                }
            }
        }
    }
`;

const ChemotherapyWithQuery = graphql(CHEMOTHARAPY_LIST_QUERY,
    {
        options: () => {
            return {
                //fetchPolicy: 'network-only'
            }
        },
        props: ({ data }) => {
            if (!data.loading) {
                return {
                    items: data.health.getChemotherapies.edges,
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
)(ChemotherapyPure);

export default ChemotherapyWithQuery;
export const ChemotherapySelect = ChemotherapyWithQuery;