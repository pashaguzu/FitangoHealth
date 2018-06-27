import CancerManager from '../components/ChemotherapyManager';
import {compose, branch, withHandlers, withState, withProps} from 'recompose';
import {withModal} from "../../../../../components/Modal/index";
import {Form} from 'antd';
 import { graphql } from 'react-apollo';
 import gql from 'graphql-tag';
 import {GET_CHEMOTHERAPIES_QUERY} from "../../../containers/Chemotherapies";

export const CHEMOTHERAPY_FRAGMENT = gql`
        fragment ChemotherapyInfo on Chemotherapy {
            id,
            title,
        }
`;

export const CHEMOTHERAPY_QUERY = gql`
    query GET_CHEMOTHERAPY ($id: UID!) {
        health {
            getChemotherapy(id:$id) {
                ...ChemotherapyInfo
            }
        }
    }
    ${CHEMOTHERAPY_FRAGMENT}
`;

// 1- add queries:
const withQuery = graphql(
    CHEMOTHERAPY_QUERY,
    {
        options: ({chemotherapy}) => {
            return {
                variables: {
                    id: chemotherapy.id,
                },
            }
        },
        props: ({ ownProps, data }) => {
            const {health={}} = data;
            const {getChemotherapy=ownProps.chemotherapy} = health;
            return {...ownProps, loading: data.loading, chemotherapy:getChemotherapy}
        },
    }
);


const CHEMOTHERAPY_UPDATE_MUTATION = gql`
    mutation ChemotherapyUpdate($id: UID!, $input:ChemotherapyInput!){
        chemotherapyUpdate(id:$id, input:$input) {
            ...ChemotherapyInfo
        }
    }
    ${CHEMOTHERAPY_FRAGMENT}
`;


const withMutationEdit = graphql(CHEMOTHERAPY_UPDATE_MUTATION, {
    props: ({ownProps:{chemotherapy}, mutate }) => ({
        onSubmit: (input) => {
            return mutate({
                variables: { id: chemotherapy.id, input: input},
            });
        },
    }),
});
const withQueryMutation = compose(withMutationEdit, withQuery);

//
//
const CHEMOTHERAPY_CREATE_MUTATION = gql`
    mutation ChemotherapyCreate($input:ChemotherapyInput!){
        chemotherapyCreate(input:$input) {
           ...ChemotherapyInfo
        }
    }
    ${CHEMOTHERAPY_FRAGMENT}
`;
export const withAddMutation = graphql(CHEMOTHERAPY_CREATE_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        onSubmit: (input) => {
            return mutate({
                variables: {input:input},
                refetchQueries: [{
                    query: GET_CHEMOTHERAPIES_QUERY,
                }],
            });
        },
    }),
});

const enhance = compose(

    branch(props => props.chemotherapy, withQueryMutation, withAddMutation),
    Form.create(),
    withHandlers({
        onSubmit: props => () => {
            //console.log(props, 'Props before input');
            props.form.validateFields((err, values) => {
                //console.log(err);
                //console.log(values);
                if (!err) {
                    props.onSubmit(values).then(({data})=> {
                        props.onHide();
                    });
                }
            });
        },
    }),
    withProps(props => {
        const modalTitle = props.chemotherapy ? 'Edit Chemotherapy' : 'Add Chemotherapy';
        return {
            modalTitle:modalTitle,
            formItemLayout : {
                labelCol: {span: 6},
                wrapperCol: {span: 18},
            }
        };
    }),
    withModal
);

export default enhance(CancerManager);