import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {TreatmentElementFragment} from "routes/Plan/components/Plan/components/TreatmentElement/components/fragments.js";
// Add
export const AddElementMutation = gql`
    mutation addTreatmentBlockElement($blockId: UID!, $type:String!, $input:TreatmentBlockElementInput!) {
        addTreatmentBlockElement(blockId: $blockId, type:$type, input: $input) {
            ...TreatmentElement
        }
    }
    ${TreatmentElementFragment}
`;
export const withAddMutation = graphql(AddElementMutation, {
    props: ({ ownProps, mutate }) => ({
        addElement: ({input, type}) => {
            return mutate({
                variables: {blockId:ownProps.blockId, type, input:input},

                update: (client, { data: { addTreatmentBlockElement } }) => {
                    const blockId = ownProps.blockId;

                    const fragment =  gql`
                       fragment TreatmentBlock on TreatmentBlock {
                            id
                            options {
                                 ...TreatmentElement
                            }
                       }
                        ${TreatmentElementFragment}
                     `;

                    let treatmentBlock = client.readFragment({
                        id: 'TreatmentBlock:'+blockId, // `id` is any id that could be returned by `dataIdFromObject`.
                        fragment: fragment,
                    });

                    console.log(treatmentBlock);
                    console.log(treatmentBlock.options);
                    console.log(addTreatmentBlockElement);

                    const options = [...treatmentBlock.options, addTreatmentBlockElement]
                    console.log(options);
                    client.writeFragment({
                        id: 'TreatmentBlock:'+blockId, // `id` is any id that could be returned by `dataIdFromObject`.
                        fragment: fragment,
                        data: {
                            ...treatmentBlock,
                            options:options,
                            __typename:'TreatmentBlock'
                        },
                    });


                },
            })
        },
    }),
});

// Edit
export const EditElementMutation = gql`
    mutation updateTreatmentBlockElement($blockId: UID!, $id:UID!, $input:TreatmentBlockElementInput!) {
        updateTreatmentBlockElement(blockId: $blockId, id:$id, input: $input) {
            ...TreatmentElement
        }
    }
    ${TreatmentElementFragment}
`;
export const withEditMutation = graphql(EditElementMutation, {
    props: ({ ownProps, mutate }) => ({
        updateElement: ({input}) => {
            return mutate({
                variables: {blockId:ownProps.blockId, id:ownProps.id, input:input},
            })
        },
    }),
});


export const GET_TREATMENT_BLOCK_ELEMENT_QUERY = gql`
    query GET_TREATMENT_BLOCK_ELEMENT ($treatmentId: UID!, $blockId: UID!, $id: UID!)  {
        getTreatment (id: $treatmentId) {
            getBlock(id: $blockId) {
                getOption (id:$id) {
                    ...TreatmentElement
                }
            }
        }
    }
    ${TreatmentElementFragment}
`;

export const withQuery = graphql(
    GET_TREATMENT_BLOCK_ELEMENT_QUERY,
    {
        options: (ownProps) => ({
            variables: {
                treatmentId: ownProps.treatmentId,
                blockId: ownProps.blockId,
                id: ownProps.id,
            },
        }),

        props: ({data}) => {
            if (!data.loading) {

                return {
                    details: data.getTreatment.getBlock.getOption,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
);
