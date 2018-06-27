import TodoTrackerItem from '../components/TodoTrackerItem'
import { graphql } from 'react-apollo';
import {BiometricPlanQuery} from '../../../../../../Plan/components/BiometricPlan/containers';



const TodoTrackerItemWithQuery = graphql(
    BiometricPlanQuery,
    {
        props: ({  data }) => {
            if (!data.loading) {
                return {
                    biometricPlan: data.biometricPlan,
                    progress: data.biometricPlan.progress || 0,
                    loading: data.loading
                }

            } else {
                return {loading: data.loading, progress:0}
            }
        },
        options: (ownProps) => ({
            skip: !ownProps.ready,
            variables: {
                user_id:ownProps.userId,
                date:ownProps.date,
            },
            fetchPolicy:  'cache-only'
        }),
    }
)(TodoTrackerItem);

export default TodoTrackerItemWithQuery;