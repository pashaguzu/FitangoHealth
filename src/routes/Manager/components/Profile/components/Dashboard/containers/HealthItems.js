import HealthItems from '../components/HealthItems';
import { graphql } from 'react-apollo';
import {GET_USER_HEALTH_ITEMS_QUERY} from "../../../../../../Health/queries";


const withQuery = graphql(
    GET_USER_HEALTH_ITEMS_QUERY,
    {
        options: (ownProps) => ({
            variables: {
                userId: ownProps.userId,
                type: ownProps.type,
            }
        }),
        props: ({data}) => {
            if (!data.loading) {
                console.log(data);
                return {
                    items: data.patient.healthRecords.edges,
                    total: data.patient.healthRecords.totalCount,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
);



export default withQuery(HealthItems);