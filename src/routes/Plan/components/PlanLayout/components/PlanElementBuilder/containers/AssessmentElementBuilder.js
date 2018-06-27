import AssessmentElementBuilder, {prepareInput} from '../components/AssessmentElementBuilder';
import { compose, withHandlers, withState, withProps, branch, renderComponent} from 'recompose';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {modalHOC, withSpinnerWhileLoading} from "../modal";
import {injectIntl} from 'react-intl';
import {Form} from 'antd';



export const GET_POSSIBLE_SCALES_QUERY = gql`
    query GET_ELEMENT_ASSESSMENTS  {
        getAssessments {
            edges {
                id
                name
            }
        }
    }
`;

const AssessmentElementBuilderWithQuery = graphql(
    GET_POSSIBLE_SCALES_QUERY,
    {
        props: ({data}) => {
            if (!data.loading) {

                return {
                    assessments: data.getAssessments.edges,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
);





const enhance = compose(
    injectIntl,
    AssessmentElementBuilderWithQuery,
    withSpinnerWhileLoading,
    withHandlers({
        saveElement: props => callback => {
            props.handleSave({prepareInput, callback} );
        }
    }),

    withHandlers({
        onSubmit: props => event => {
            props.saveElement(props.onHide);
        },
        modalTitle: props => values => {
            return props.id ? 'Edit Assessment' : 'Add Assessment';
        },
    }),
    modalHOC,
)
export default Form.create()(enhance(AssessmentElementBuilder));
