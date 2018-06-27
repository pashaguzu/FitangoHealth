import Publish from '../components/Publish';
import {PlanCardFragment} from '../../../../Plan/components/Plan/fragments';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const PlanUpdateMutation = gql`
    mutation publishPlan($id: UID!, $isLocked: Boolean){
        planPublish(id:$id, isLocked:$isLocked)
    }
`;

const withMutation = graphql(PlanUpdateMutation, {
    props: ({ ownProps, mutate }) => ({
        publish: (isLocked) => {
            return mutate({
                variables: { id: ownProps.plan.id, isLocked: isLocked}
            });
        },
    }),
});



export default withMutation((Publish));