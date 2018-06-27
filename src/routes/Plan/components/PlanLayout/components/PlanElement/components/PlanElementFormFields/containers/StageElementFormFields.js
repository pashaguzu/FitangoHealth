import ElementEditor, {prepareInput} from '../components/StageElementFormFields';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {GET_CANCER_STAGES_QUERY} from "../../../../../../../../Manager/containers/Stages";

export const prepareStageInput = prepareInput;


const ElementEditorWithQuery = graphql(
    GET_CANCER_STAGES_QUERY,
    {
        props: ({data}) => {
            if (!data.loading) {

                return {
                    stages: data.getCancerStages.edges,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
)(ElementEditor);


export default ElementEditorWithQuery;
