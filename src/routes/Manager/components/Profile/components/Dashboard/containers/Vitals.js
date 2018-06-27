import Vitals from '../components/Vitals';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {ElementTrackerFragment, ElementTrackerReportFragment} from "../../../../../../Plan/components/Plan/fragments";

export const GET_USER_VITALS_QUERY = gql`
    query GET_USER_VITALS ($userId: UID!) {
        patient (id: $userId) {
            id
            getVitals {
              ...TrackerElement
              getLastReport (userId:$userId) {
                ...TrackerReportFields
                datetime
              }
            }
        }
    }
    ${ElementTrackerFragment}
    ${ElementTrackerReportFragment}
`;

const withQuery = graphql(
    GET_USER_VITALS_QUERY,
    {
        options: (ownProps) => ({
            variables: {
                userId: ownProps.userId,
            }
        }),
        props: ({data}) => {
            if (!data.loading) {
                console.log(data);
                return {
                    vitals: data.patient.getVitals,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
);



export default withQuery(Vitals);