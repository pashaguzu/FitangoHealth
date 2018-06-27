import AddLessonModal from '../components/AddLessonModal'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {message} from 'antd';
import {PlanElementPureFragment} from "../../../../../../Plan/components/Plan/fragments";

const AddPlanLessonMutation=gql`
 mutation addPlanLesson($planId: UID!, $title: String!) {
        addPlanLesson(planId: $planId, title: $title) {
              id,
              title
        }
    }
`;

const PLAN_BODY_LESSONS_QUERY = gql`
    query PB_PLAN_BODY ($id: UID!) {
        plan (id: $id) {
            id
            lessons {
                id
                title
                elements {
                    ...PlanElement,
                }
            }
        }
    }
    ${PlanElementPureFragment}
`;


const withMutation = graphql(AddPlanLessonMutation, {
    props: ({ ownProps, mutate }) => ({
        submitLesson: (title) => {
            return mutate({
                variables: {planId: ownProps.planId, title: title},
                refetchQueries: [{
                    query: PLAN_BODY_LESSONS_QUERY,
                    variables: { id: ownProps.planId, date:''},
                }],
            }).then((data) => {
                ownProps.onHide();
                message.success('Added');
            })},
    }),
});



export default withMutation(AddLessonModal);