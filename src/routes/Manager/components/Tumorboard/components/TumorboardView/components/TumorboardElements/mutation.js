import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


// UPDATE TUMORBOARD
const TUMORBOARD_ELEMENT_UPDATE_ORDER_MUTATION = gql`
    mutation TumorboardUpdateElementsOrder($id: UID!,  $elementIds:[UID]!){
        tumorboardUpdateElementsOrder(id:$id, elementIds:$elementIds)
    }
`;


export const withUpdateOrderMutation = graphql(TUMORBOARD_ELEMENT_UPDATE_ORDER_MUTATION, {
    props: ({ownProps:{tumorboard, userId}, mutate }) => ({
        updateOrder: (elementIds) => {
            return mutate({
                variables: { id: tumorboard.id, elementIds},
                // refetchQueries: [{
                //     query: GET_CANCER_STAGES_QUERY,
                // }],
            });
        },
    }),
});