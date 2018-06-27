import Tumorboards from '../components/Tumorboards';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {TumorboardFragment} from "../../../../Tumorboard/containers/TumorboardManager";

export const GET_USER_TUMORBOARDS_QUERY = gql`
    query GET_USER_TUMORBOARDS ($userId: UID!) {
        patient (id: $userId) {
            id
            getTumorboards {
              ...TumorboardInfo
            }
        }
    }
    ${TumorboardFragment}
`;

const withQuery = graphql(
    GET_USER_TUMORBOARDS_QUERY,
    {
        options: (ownProps) => ({
            variables: {
                userId: ownProps.userId,
            }
        }),
        props: ({data}) => {
            if (!data.loading) {
                return {
                    items: data.patient.getTumorboards,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
);



export default withQuery(Tumorboards);