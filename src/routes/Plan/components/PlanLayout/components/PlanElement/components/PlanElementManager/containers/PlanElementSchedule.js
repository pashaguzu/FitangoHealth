import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PlanElementSchedule from '../components/PlanElementSchedule';


const GET_PLAN_SCHEDULE = gql`
    query GET_PLAN_SCHEDULE ($planId: UID!) {
        plan(id: $planId) {
            id
            schedule {
                type
                startDate
                endDate
                limitStartDow
                relativeEndDay
                dows
            }
        }
    }
`;


const PlanElementScheduleWithQuery = graphql(
    GET_PLAN_SCHEDULE,
    {
        options: (ownProps) => ({
            skip: !ownProps.schedule,
            variables: {
                planId: ownProps.planId,
            },
            //fetchPolicy: 'cache-only'
        }),
        props: ({data}) => {
            console.log(data);
            if (!data.loading) {
                return {
                    planSchedule: data.plan.schedule,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
)(PlanElementSchedule);

export default PlanElementScheduleWithQuery;
