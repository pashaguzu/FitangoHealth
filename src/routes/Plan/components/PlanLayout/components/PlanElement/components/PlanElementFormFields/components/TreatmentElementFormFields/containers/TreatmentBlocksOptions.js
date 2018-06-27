import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import TreatmentBlocksOptions from '../components/TreatmentBlockOptions';
import {TreatmentElementFragment} from "../../../../../../../../Plan/components/TreatmentElement/components/fragments";

export const GET_TREATMENT_BLOCKS_QUERY = gql`
    query GET_TREATMENT_BLOCKS ($treatmentId: UID!)  {
        getTreatment (id: $treatmentId) {
            blocks {
                id
                title
                options {
                    ...TreatmentElement
                }
            }
        }
    }
    ${TreatmentElementFragment}
`;

export const withQuery = graphql(
    GET_TREATMENT_BLOCKS_QUERY,
    {
        options: (ownProps) => ({
            variables: {
                treatmentId: ownProps.details.id,
            },
        }),

        props: ({data}) => {
            if (!data.loading) {
                return {
                    blocks: data.getTreatment.blocks,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading, }
            }
        },
    }
);

export default withQuery(TreatmentBlocksOptions);
