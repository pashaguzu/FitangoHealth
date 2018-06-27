import ElementEditor from '../components/AssessmentElementFormFields';
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

const ElementEditorWithQuery = graphql(
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
)(ElementEditor);


export default ElementEditorWithQuery;
