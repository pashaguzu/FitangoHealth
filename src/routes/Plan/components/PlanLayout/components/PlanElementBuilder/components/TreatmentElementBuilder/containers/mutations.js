import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {TreatmentElementFragment} from "../../../../../../Plan/components/TreatmentElement/components/fragments";
// Add
export const AddElementMutation = gql`
    mutation addTreatmentElement($blockId: UID,  $input:TreatmentElementInput!) {
        addTreatmentElement(treatmentId: $blockId, input: $input) {
            ...TreatmentElement
        }
    }
    ${TreatmentElementFragment}
`;
const fragment =  gql`
       fragment TreatmentBlock on TreatmentBlock {
            id
            options {
                 ...TreatmentElement
            }
       }
        ${TreatmentElementFragment}
`;
export const withAddMutation = graphql(AddElementMutation, {
    props: ({ ownProps, mutate }) => ({
        addElement: ({input}) => {
            return mutate({
                variables: {blockId:ownProps.treatmentId, input:input},

                update: (client, { data: { addTreatmentBlockElement } }) => {
                    const blockId = ownProps.treatmentId;

                    //console.log(1111);
                    let treatmentBlock = client.readFragment({
                        id: 'TreatmentBlock:'+blockId, // `id` is any id that could be returned by `dataIdFromObject`.
                        fragment: fragment,
                        fragmentName: "TreatmentBlock",
                    });

                    /*console.log(treatmentBlock);
                    console.log(treatmentBlock.options);
                    console.log(addTreatmentBlockElement);*/

                    const options = [...treatmentBlock.options, addTreatmentBlockElement]
                    //console.log(options);
                    client.writeFragment({
                        id: 'TreatmentBlock:'+blockId, // `id` is any id that could be returned by `dataIdFromObject`.
                        fragment: fragment,
                        fragmentName: "TreatmentBlock",
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
    mutation updateTreatmentElement($blockId: UID!, $id:UID!, $input:TreatmentElementInput!) {
        updateTreatmentElement(treatmentId: $blockId, id:$id, input: $input) {
            ...TreatmentElement
        }
    }
    ${TreatmentElementFragment}
`;
export const withEditMutation = graphql(EditElementMutation, {
    props: ({ ownProps, mutate }) => ({
        updateElement: ({input}) => {
            return mutate({
                variables: {blockId:ownProps.treatmentId, id:ownProps.id, input:input},
                refetchQueries: [{
                    query:  GET_TREATMENT_BLOCK_ELEMENTS_QUERY,
                    variables: { treatmentId: ownProps.treatmentId},
                }],
            })
        },
    }),
});
// Delete
export const GET_TREATMENT_BLOCK_ELEMENTS_QUERY = gql`
    query GET_TREATMENT_BLOCK_ELEMENTS ($treatmentId: UID!)  {
        getTreatment (id: $treatmentId) {
            elements {
                    ...TreatmentElement
            }
        }
    }
    ${TreatmentElementFragment}
`;

const TREATMENT_ELEMENTS_FRAGMENT =  gql`
   fragment TreatmentElements on Treatment {
        id
        elements {
            ...TreatmentElement
        }
   }
    ${TreatmentElementFragment}
 `;



export const DeleteElementMutation = gql`
    mutation deleteTreatmentElement($treatmentId: UID!, $id:UID!) {
        deleteTreatmentElement(treatmentId: $treatmentId, id:$id)
    }
`;
export const withDeleteMutation = graphql(DeleteElementMutation, {
    props: ({ ownProps, mutate }) => ({
        deleteElement: () => {
            console.log(ownProps);
            return mutate({
                variables: {treatmentId:ownProps.treatmentId, id:ownProps.option.id},

                update: (client, { data: { planElementReport } }) => {
                    //const {mode, planId, parentId} = ownProps;
                    //console.log(ownProps);
                    const treatmentId = ownProps.treatmentId;
                    // if it's pathway - remove
                    let treatment = client.readFragment({
                        id: 'Treatment:' + treatmentId, // `id` is any id that could be returned by `dataIdFromObject`.
                        fragment: TREATMENT_ELEMENTS_FRAGMENT,
                        fragmentName: "TreatmentElements",
                    });

                    let {elements=[]} = treatment;
                    elements = elements.filter(element => element.id !== ownProps.option.id);
                    elements = elements.length > 0 ? elements : [];

                    client.writeFragment({
                        id: 'Treatment:' + treatmentId, // `id` is any id that could be returned by `dataIdFromObject`.
                        fragment: TREATMENT_ELEMENTS_FRAGMENT,
                        fragmentName: "TreatmentElements",
                        data: {
                            ...treatment,
                            elements: elements,
                            __typename: 'Treatment'
                        },
                    });
                },

                /*refetchQueries: [{
                    query:  GET_TREATMENT_BLOCK_ELEMENTS_QUERY,
                    variables: { treatmentId: ownProps.treatmentId},
                }],*/
            })
        },
    }),
});


export const GET_TREATMENT_BLOCK_ELEMENT_QUERY = gql`
    query GET_TREATMENT_BLOCK_ELEMENT ($treatmentId: UID!, $id: UID!)  {
        getTreatment (id: $treatmentId) {
            getElement(id: $id) {
                ...TreatmentElement
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
                    details: data.getTreatment.getElement,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
);
