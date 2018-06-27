import TodoMedicationItem from '../components/TodoMedicationItem'
import { graphql } from 'react-apollo';
import {MedicationPlan_QUERY} from '../../../../../../Plan/components/MedicationPlan/containers';



const TodoMedicationItemWithQuery = graphql(
    MedicationPlan_QUERY,
    {
        props: ({  data }) => {
            if (!data.loading) {
                return {
                    medicationPlan: data.medicationPlan,
                    progress: data.medicationPlan.progress,
                    loading: data.loading
                }

            } else {
                return {loading: data.loading}
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
)(TodoMedicationItem);

export default TodoMedicationItemWithQuery;