import LabTestResults from '../components/LabTestResults';
import { graphql } from 'react-apollo';
import {GET_USER_LAB_RESULTS_QUERY} from "../../../../../../Health/queries";


const withQuery = graphql(
    GET_USER_LAB_RESULTS_QUERY,
    {
        options: (ownProps) => ({
            variables: {
                userId: ownProps.userId,
            }
        }),
        props: ({data}) => {
            if (!data.loading) {
                return {
                    items: data.patient.getLabResults.edges,
                    total: data.patient.getLabResults.totalCount,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
);



export default withQuery(LabTestResults);