import gql from 'graphql-tag';
import {HealthElementFragment} from "./components/fragments";
import {ElementTrackerFragment} from "../Plan/components/Plan/fragments";

export const GET_USER_HEALTH_ITEMS_QUERY = gql`
    query GET_USER_HEALTH_ITEMS ($userId: UID!, $type: String!) {
        patient (id: $userId) {
            id
            healthRecords (type: $type) {
                totalCount
                edges {
                    ...HealthElement
                }
            }
            
        }
    }
    ${HealthElementFragment}
`;


export const GET_USER_LAB_RESULTS_QUERY = gql`
    query GET_USER_LAB_RESULTS ($userId: UID!) {
        patient (id: $userId) {
            id
            getLabResults {
                totalCount
                edges {
                    id
                    title
                    measurements {
                        id
                    }
                    testDate
                }
            }
            
        }
    }
`;