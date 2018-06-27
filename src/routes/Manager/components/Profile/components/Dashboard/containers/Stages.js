import Stages from '../components/Stages';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {ElementTrackerFragment, ElementTrackerReportFragment} from "../../../../../../Plan/components/Plan/fragments";

export const GET_USER_VITALS_QUERY = gql`
    query GET_NETWORK_STAGES ($userId: UID!)  {
        network {
            id
            getStages {
              id
              type
              typeText
              title
              description
              isDefault
              color
              isTimestamp
              isDatestamp
            }
        }
        patient (id: $userId) {
            id
            getStages {
                id
                startDate
                stage {
                    id
                }
                isCurrent
            }
        }
    }
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
                    stages: data.network.getStages,
                    patientStages: data.patient.getStages,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
);



export default withQuery(Stages);