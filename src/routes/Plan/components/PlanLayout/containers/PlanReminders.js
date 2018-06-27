import PlanReminders from '../components/PlanReminders';

import {graphql} from 'react-apollo';
import gql from 'graphql-tag';


export const PLAN_REMINDERS_QUERY = gql`
    query GET_PLAN_REMINDERS ($upid: UID!) {
        userPlan (id: $upid) {
            id
            reminders {
                id
            }
        }
        reminderTypes: __type(name: "UserPlanReminderTypeEnum") {
            name
            enumValues {
              name
              description
            }
        }
        notificationTypes: __type(name: "NotificationTypeEnum") {
            name
            enumValues {
              name
              description
            }
        }
    }
`;


// 1- add queries:
const PlanRemindersWithQuery = graphql(
    PLAN_REMINDERS_QUERY,
    {
        options: (ownProps) => ({
            variables: {
                upid: ownProps.upid
            }

        }),
        props: ({ownProps, data}) => {
            if (!data.loading) {
                return {
                    reminders: data.userPlan.reminders,
                    reminderTypes: data.reminderTypes.enumValues,
                    notificationTypes: data.notificationTypes.enumValues,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
)(PlanReminders);


const SaveRemindersMutation = gql`
    mutation userPlanAddReminder($input: [PlanRemindersInput]!, $upid: UID!) {
        userPlanAddReminder(upid: $upid, input: $input)
    }
`;


export const withMutation = graphql(SaveRemindersMutation, {
    props: ({ownProps, mutate}) => ({
        saveReminders: (input) => {
            return mutate({
                variables: {upid: ownProps.upid, input: input},

            })
        },

    }),
});


export default withMutation(PlanRemindersWithQuery);