import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PlanElementChildrenManager from '../components/PlanElementChildrenManager';
import {PlanElementPureFragment} from "../../../../../../Plan/fragments";
import {PLAN_ELEMENT_CHILDREN_QUERY} from "../../../containers/queries";


const addChildElementMutation = gql`
    mutation addChildElement($parentId: UID!, $parentValue: UID!, $planId: UID!, $type:PlanElementEnum!,$input:PlanBodyElementInput!) {
        addChildElement(planId: $planId, type:$type, parentId: $parentId, parentValue:$parentValue, input: $input) {
            id
        }
    }
    ${PlanElementPureFragment}
`;

 const withAddChildMutation = graphql(addChildElementMutation, {
    props: ({ ownProps, mutate }) => ({
        addChildElement: (input) => {
            return mutate({
                variables: {planId:ownProps.planId, type:ownProps.type, parentId:ownProps.parentId, parentValue:ownProps.parentValue, input:input},
                refetchQueries: [{
                    query: PLAN_ELEMENT_CHILDREN_QUERY,
                    variables: {id:ownProps.parentId, planId:ownProps.planId, elementValue:ownProps.parentValue}
                }]
            })
        },
    }),
});



export default withAddChildMutation(PlanElementChildrenManager);
