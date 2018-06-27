import TimelineElementModal from '../components/TimelineElementModal';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {TimelineElementFragment} from "../fragments";
import {GET_TIMELINE_QUERY} from '../../../containers/Timeline';

const addTimelineElementMutation = gql`
    mutation addTimelineElement($userId: UID!, $type: TimelineElementEnum!, $input: TimelineInput!){
        addTimelineElement(userId:$userId, type:$type, input:$input) {
            ...TimelineElement
        }
    }
    ${TimelineElementFragment}
`;

const withMutation = graphql(addTimelineElementMutation, {
    props: ({ ownProps, mutate }) => ({
        submitTimelineElement: (input) => {
            const type = ownProps.type || ownProps.element.type;
            return mutate({
                variables: { userId: ownProps.userId, type, input: input},
                refetchQueries: [{
                    query: GET_TIMELINE_QUERY,
                    variables: { userId: ownProps.userId},
                }],
            })
        },

    }),
});

export default withMutation(TimelineElementModal);//withQuery(Pathway);


const updateTimelineElementMutation = gql`
    mutation updateTimelineElement($id: UID!, $userId: UID!, $input: TimelineInput!){
        updateTimelineElement(id:$id, userId:$userId, input:$input) {
            ...TimelineElement
        }
    }
    ${TimelineElementFragment}
`;

 const withUpdateTimelineElementMutation = graphql(updateTimelineElementMutation, {
    props: ({ ownProps, mutate }) => ({
        submitTimelineElement: (input) => {
            //console.log(ownProps);
            return mutate({
                variables: { id: ownProps.item.id, userId: ownProps.userId, input: input},
            })
        },
    }),
});

export const TimelineElementModalWithMutation = withUpdateTimelineElementMutation(TimelineElementModal);