import TumorboardManager from '../components/TumorboardManager';
import {compose, branch, withHandlers, withState, withProps} from 'recompose';
import {UserInfoFragment} from "../../../../User/fragments";
import {Form} from 'antd';
 import { graphql } from 'react-apollo';
 import gql from 'graphql-tag';
import { ElementLinkFragment, ElementTextFragment, ElementTreatmentFragment, ElementOptionsFragment,
    ElementClinicalNoteFragment} from "../../../../Plan/components/Plan/fragments";
import {HealthElementFragment} from "../../../../Health/components/fragments";


export const TumorboardElementFragment  = gql`
    fragment TumorboardElementInfo on TumorboardElement {
        id
        activity {
            ... on TimelineElementBasic {
              id
              text
              __typename
            }
            ... on PlanElementLink {
              ...LinkElement
            }
            ... on PlanElementText {
              ...TextElement
            }
             ... on PlanElementClinicalNote {
              ...ClinicalNoteElement
            }
            ... on Treatment {
                ...TreatmentPlanElement
            }
            ... on PlanElementChecklist {
                  ...OptionsElement
            }
            ... on HealthRecord {
                  ...HealthElement
                  
            }
         }
         type 
         typeText  
         notes
         __typename
    }
     ${ElementLinkFragment}
     ${ElementTextFragment}
     ${ElementClinicalNoteFragment}
     ${ElementTreatmentFragment}
     ${ElementOptionsFragment}
     ${HealthElementFragment}
`;

export const TumorboardSimpleFragment = gql`
        fragment TumorboardSimpleInfo on Tumorboard {
            id,
            title,
            lead {
                ...UserInfo
            }
            admin {
                ...UserInfo
            }
            location
            video
            notes
            startDate
            endDate
            startTime
            endTime
            isOpen
        }
        ${UserInfoFragment}
`;
export const TumorboardFragment = gql`
        fragment TumorboardInfo on Tumorboard {
            ...TumorboardSimpleInfo
        }
        ${TumorboardSimpleFragment}
`;

export const TUMORBOARD_QUERY = gql`
    query GET_TUMORBOARD ($id: UID!) {
        health {
            getCancer(id:$id) {
                ...CancerInfo
            }
        }
    }
    ${TumorboardFragment}
`;

const withQuery = graphql(
    TUMORBOARD_QUERY,
    {
        options: ({tumorboard}) => {
            return {
                variables: {
                    id: tumorboard.id,
                }
            }
        },
        props: ({ ownProps, data }) => {
            const {tumorboard=ownProps.tumorboard} = data;
            return {...ownProps, loading: data.loading, tumorboard}
        },
    }
);


// UPDATE TUMORBOARD
const TUMORBOARD_UPDATE_MUTATION = gql`
    mutation TumorboardUpdate($id: UID!, $input:TumorboardInput!){
        tumorboardUpdate(id:$id, input:$input) {
            ...TumorboardInfo
        }
    }
    ${TumorboardFragment}
`;


const withMutationEdit = graphql(TUMORBOARD_UPDATE_MUTATION, {
    props: ({ownProps:{tumorboard}, mutate }) => ({
        onSubmit: (input) => {
            return mutate({
                variables: { id: tumorboard.id, input: input},
                // refetchQueries: [{
                //     query: GET_CANCER_STAGES_QUERY,
                // }],
            });
        },
    }),
});
const withQueryMutation = compose(withMutationEdit/*, withQuery*/);



export const GET_PATIENT_TUMORBOARD_QUERY  = gql`
    query GET_PATIENT_TUMORBOARD ($userId: UID!) {
        getPatientTumorboard (userId:$userId) {
            ...TumorboardInfo
        }
    }
    ${TumorboardFragment}
`;

// ADD tumorboard
const TUMORBOARD_CREATE_MUTATION = gql`
    mutation CancerTumorboard($input:TumorboardInput!, $userId: UID!){
        tumorboardCreate(input:$input, userId:$userId) {
           ...TumorboardInfo
        }
    }
    ${TumorboardFragment}
`;
export const withAddMutation = graphql(TUMORBOARD_CREATE_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        onSubmit: (input) => {
            return mutate({
                variables: {input:input, userId:ownProps.userId},
                refetchQueries: [{
                    query: GET_PATIENT_TUMORBOARD_QUERY,
                    variables: {userId:ownProps.userId},
                }],
            });
        }
    })
});

export const tumorboardMutation = branch(props => props.tumorboard.id, withQueryMutation, withAddMutation);


const enhance = compose(
    tumorboardMutation,
    Form.create(),
    withHandlers({
        onSubmit: props => () => {
            console.log(props, 'Props before input');
            props.form.validateFields((err, values) => {
                //console.log(err);
                //console.log(values);
                if (!err) {
                    props.onSubmit(values).then(({data})=> {
                        props.onHide();
                    });
                }
            });
        }
    }),
    //withModal
);

export default enhance(TumorboardManager);