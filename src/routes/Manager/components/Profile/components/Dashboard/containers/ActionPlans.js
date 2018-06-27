import ActionPlans from '../components/ActionPlans';
import { graphql } from 'react-apollo';
import {USER_PLANS_LIST_QUERY} from "../../../../../../Plan/containers/PlansList";

const withQuery = graphql(
    USER_PLANS_LIST_QUERY,
    {
        options: (ownProps) => ({
            variables: {
                userId: ownProps.userId,
                status: 'active'
            }
        }),
        props: ({data}) => {
            if (!data.loading) {
                return {
                    plans: data.user.plans,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
);



export default withQuery(ActionPlans);