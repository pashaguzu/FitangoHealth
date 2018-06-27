import ElementEditor from '../components/TextElementTipIcons';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const GET_POSSIBLE_TIPBOXES_QUERY = gql`
    query GET_PB_TIPBOXES  {
        planbuilder {
            getTipboxes  {
               value
               label
            }
        }
    }
`;

const ElementEditorWithQuery = graphql(
    GET_POSSIBLE_TIPBOXES_QUERY,
    {
        props: ({data}) => {
            if (!data.loading) {

                return {
                    tipboxes: data.planbuilder.getTipboxes,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
)(ElementEditor);


export default ElementEditorWithQuery;
