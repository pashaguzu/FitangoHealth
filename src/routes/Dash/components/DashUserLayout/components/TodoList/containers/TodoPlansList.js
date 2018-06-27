import TodoPlansList from '../components/TodoPlansList'
import { graphql } from 'react-apollo';

import {USER_PLANS_LIST_QUERY} from '../../../../../../Plan/containers/PlansList';

const TodoPlansListWithQuery = graphql(
    USER_PLANS_LIST_QUERY,
    {
        //skip: (ownProps) => ownProps.loading,
        props: ({  data }) => {
            if (!data.loading) {
                return {
                    plans: data.user.plans,
                    loading: data.loading
                }

            } else {
                return {loading: data.loading}
            }
        },
        options: (ownProps) => ({
            skip: !ownProps.ready,
            variables: {
                user_id: ownProps.userId,
                status: 'active'
            },
            fetchPolicy:  'cache-only'
        }),
    }
)(TodoPlansList);

export default TodoPlansListWithQuery;