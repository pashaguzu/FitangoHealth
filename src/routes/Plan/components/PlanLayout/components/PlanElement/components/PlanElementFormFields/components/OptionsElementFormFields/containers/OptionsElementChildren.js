import OptionsElementChildren from '../components/OptionsElementChildren';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const GET_POSSIBLE_SCALES_QUERY = gql`
    query GET_ELEMENT_ASSESSMENTS  {
        getAssessments {
            edges {
                id
                name
            }
        }
    }
`;

const OptionsElementChildrenWithQuery = graphql(
    GET_POSSIBLE_SCALES_QUERY,
    {
        props: ({data}) => {
            if (!data.loading) {

                return {
                    assessments: data.getAssessments.edges,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
)(OptionsElementChildren);


export default OptionsElementChildren;
