import ClinicalTrialView from '../components/ClinicalTrialView';
import {compose, branch, withProps, withHandlers, withStateHandlers} from 'recompose';
import {withModal, withSpinnerWhileLoading} from "../../../../../components/Modal/index";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {ClinicalTrialFragment} from "../fragments";

export const GET_CLINICAL_TRIAL_QUERY = gql`    
    query GET_CLINICAL_TRIAL ($id: UID!) {
        getClinicalTrial (id:$id) {
            ...ClinicalTrialInfo
        }
    }
    ${ClinicalTrialFragment}
`;

// 1- add queries:
const withQuery = graphql(
    GET_CLINICAL_TRIAL_QUERY,
    {
        options: (ownProps) => {
            return {
                variables: {
                    id: ownProps.clinicalTrial.id,
                },
            }
        },
        props: ({ ownProps, data }) => {
            let {clinicalTrial={}} = ownProps;
            let {loading, getClinicalTrial={}} = data;
            if (!loading) {
                clinicalTrial = getClinicalTrial;
            }
            return {...ownProps, loading, clinicalTrial};
        },
    }
);

const modalEnhance = compose(
    withProps(props => {
        return {modalTitle: 'View Clinical Trial', modalFooter:'close'}
    }),
    withModal,
    withSpinnerWhileLoading
);
const enhance = compose(
    withQuery,
    branch(props => props.asModal, modalEnhance)
)
export default enhance(ClinicalTrialView);