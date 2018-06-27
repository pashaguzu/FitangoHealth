import AddSectionModal from '../components/AddSectionModal'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {message} from 'antd';
import {PlanElementPureFragment} from "../../../../../../Plan/components/Plan/fragments";

const AddPlanLessonMutation=gql`
 mutation addPlanActivity($planId: UID!, $title: String!) {
        addPlanActivity(planId: $planId, title: $title) {
              id,
              title
        }
    }
`;

const PLAN_BODY_ACTIVITIES_QUERY = gql`
    query PB_PLAN_BODY_ACTIVITIES ($id: UID!) {
        plan (id: $id) {
            id
            activities {
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
                    query: PLAN_BODY_ACTIVITIES_QUERY,
                    variables: { id: ownProps.planId},
                }],
            }).then((data) => {
                ownProps.onHide();
                message.success('Action has been Added');
            })},
    }),
});



export default withMutation(AddSectionModal);