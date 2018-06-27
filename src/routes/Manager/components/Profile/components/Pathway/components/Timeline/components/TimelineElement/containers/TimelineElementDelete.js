import {Modal, message} from 'antd';
import {compose, withHandlers} from 'recompose';
import TimelineElementDelete from '../components/TimelineElementDelete';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {GET_TIMELINE_QUERY} from "../../../../../containers/Timeline";


const TIMELINE_ELEMENT_DELETE_MUTATION = gql`
    mutation TimelineElementDelete($id: UID!){
        deleteTimelineElement(id:$id)
    }
`;

const withMutation = graphql(TIMELINE_ELEMENT_DELETE_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        onTimelineElementDelete: () => {
            return mutate({
                variables: { id: ownProps.item.id},
                refetchQueries: [{
                    query: GET_TIMELINE_QUERY,
                    variables: { userId: ownProps.userId},
                }],
            }).then(({data}) => {
                message.success('Deleted');
                //submitCallback(data.planUpdate);
            });
        },
    }),
});


const enhance = compose(
    withMutation,
    withHandlers({
        deleteElement: props => () => {

            Modal.confirm({
                title: 'Are you sure you want to delete this element?',
                //content: 'Some descriptions',
                onOk() {
                    // remove
                    props.onTimelineElementDelete();
                },
            });
        }
    })
)

export default enhance(TimelineElementDelete);
