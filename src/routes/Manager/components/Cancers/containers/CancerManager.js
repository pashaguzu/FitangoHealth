import CancerManager from '../components/CancerManager';
import {compose, branch, withHandlers, withState, withProps} from 'recompose';
import {withModal} from "../../../../../components/Modal/index";
import {Form} from 'antd';
 import { graphql } from 'react-apollo';
 import gql from 'graphql-tag';
 import {GET_CANCERS_QUERY} from "../../../containers/Cancers";
//
// import {GET_CANCER_STAGES_QUERY} from "../../../containers/Stages";
//

export const CancerFragment = gql`
        fragment CancerInfo on Cancer {
            id,
            title,
            code
            stage {
                id
                title
                letters
                rules {
                    id
                    stage
                    options {
                        id
                        letter
                        name
                    }
                }
            }
            chemotherapies {
                id
                title
            }
        }
`;

export const CANCER_QUERY = gql`
    query GET_CANCER ($id: UID!) {
        health {
            getCancer(id:$id) {
                ...CancerInfo
            }
        }
    }
    ${CancerFragment}
`;

// 1- add queries:
const withQuery = graphql(
    CANCER_QUERY,
    {
        options: ({cancer}) => {
            //console.log(cancer);
            return {
                //skip: !ownProps.id,
                variables: {
                    id: cancer.id,
                },
                //fetchPolicy: 'cache-only'
            }
        },
        props: ({ ownProps, data }) => {
            const {health={}} = data;
            const {getCancer=ownProps.cancer} = health;
            return {...ownProps, loading: data.loading, cancer:getCancer}
        },
    }
);


const CANCER_UPDATE_MUTATION = gql`
    mutation CancerUpdate($id: UID!, $input:CancerInput!){
        cancerUpdate(id:$id, input:$input) {
            ...CancerInfo
        }
    }
    ${CancerFragment}
`;


const withMutationEdit = graphql(CANCER_UPDATE_MUTATION, {
    props: ({ownProps:{cancer}, mutate }) => ({
        onSubmit: (input) => {
            return mutate({
                variables: { id: cancer.id, input: input},
                // refetchQueries: [{
                //     query: GET_CANCER_STAGES_QUERY,
                // }],
            });
        },
    }),
});
const withQueryMutation = compose(withMutationEdit, withQuery);

//
//
const CANCER_CREATE_MUTATION = gql`
    mutation CancerCreate($input:CancerInput!){
        cancerCreate(input:$input) {
           ...CancerInfo
        }
    }
    ${CancerFragment}
`;
//
//
export const withAddMutation = graphql(CANCER_CREATE_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        onSubmit: (input) => {
            return mutate({
                variables: {input:input},
                refetchQueries: [{
                    query: GET_CANCERS_QUERY,
                }],
            });
        },
    }),
});
//
//
// export const withMutations = compose(
//     withMutation,
//     withAddMutation,
// );
//
// export default withMutations(withQuery(StageManager));

const enhance = compose(

    branch(props => props.cancer, withQueryMutation, withAddMutation),
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
    withProps(props => {
        return {modalTitle: props.cancer ? 'Edit Cancer' : 'Add Cancer'}
    }),
    withModal
);

export default enhance(CancerManager);