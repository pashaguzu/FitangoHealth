import StageLetters from '../components/StageLetters';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

export const CANCER_POSSIBLE_LETTERS_QUERY = gql`    
    query GET_CANCER_POSSIBLE_LETTERS {
        eventTypes: __type(name: "CancerStageLetterEnum") {
            name
            enumValues {
                name
                description
            }
        }
    }
`;

// 1- add queries:
const withQuery = graphql(
    CANCER_POSSIBLE_LETTERS_QUERY,
    {
        props: ({ ownProps, data }) => {
            if (!data.loading) {
                return {
                    cancerLetters: data.eventTypes.enumValues,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
);

export default withQuery(StageLetters);