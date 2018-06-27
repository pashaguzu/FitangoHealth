import AddCalendarEvent from '../components/AddCalendarEvent';

import {graphql} from 'react-apollo';
import gql from 'graphql-tag';


export const CALENDAR_EVENT_QUERY = gql`
    query GET_EVENT_INFO {
        
        eventTypes: __type(name: "CalendarEventTypeEnum") {
            name
            enumValues {
              name
              description
            }
        }
        
        eventDurations: __type(name: "CalendarEventDurationEnum") {
            name
            enumValues {
              name
              description
            }
        }
        
        
    }
`;


// 1- add queries:
const AddCalendarEventWithQuery = graphql(
    CALENDAR_EVENT_QUERY,
    {
        options: (ownProps) => ({
            variables: {
               id: ownProps.id
            }

        }),
        props: ({ownProps, data}) => {
            if (!data.loading) {
                return {
                    eventTypes: data.eventTypes.enumValues,
                    eventDurations: data.eventDurations.enumValues,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
)(AddCalendarEvent);


const SaveRemindersMutation = gql`
    mutation createCalendarEvent($input: CalendarEventInput!) {
        createCalendarEvent(input: $input)
    }
`;


export const withMutation = graphql(SaveRemindersMutation, {
    props: ({ownProps, mutate}) => ({
        saveEvent: (input) => {
            return mutate({
                variables: {id: ownProps.id, input: input},

            })
        },

    }),
});


export default withMutation(AddCalendarEventWithQuery);