import ScaleElementFormFields from '../components/ScaleElementFormFields';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const GET_POSSIBLE_SCALES_QUERY = gql`
    query GET_ELEMENT_SCALES  {
        planbuilder {
            getScales  {
               id
               name
               options
            }
        }
    }
`;

export const ScaleElementFormFieldsWithQuery = graphql(
    GET_POSSIBLE_SCALES_QUERY,
    {
        props: ({data}) => {
            if (!data.loading) {

                return {
                    scales: data.planbuilder.getScales,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
)(ScaleElementFormFields);


export default ScaleElementFormFieldsWithQuery;
