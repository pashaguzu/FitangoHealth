import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {TreatmentElementFragment} from "../../../../../../../../../../Plan/components/TreatmentElement/components/fragments";

// Delete
export const GET_TREATMENT_BLOCK_ELEMENTS_QUERY = gql`
    query GET_TREATMENT_BLOCK_ELEMENTS ($treatmentId: UID!, $blockId: UID!)  {
        getTreatment (id: $treatmentId) {
            getBlock(id: $blockId) {
                options {
                    ...TreatmentElement
                }
            }
        }
    }
    ${TreatmentElementFragment}
`;

export const DeleteElementMutation = gql`
    mutation deleteTreatmentBlockElement($blockId: UID!, $id:UID!) {
        deleteTreatmentBlockElement(blockId: $blockId, id:$id)
    }
`;
