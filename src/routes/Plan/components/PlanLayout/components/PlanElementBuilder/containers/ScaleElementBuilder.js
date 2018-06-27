import ScaleElementBuilder, {prepareInput} from '../components/ScaleElementBuilder';
import { compose, withHandlers} from 'recompose';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {modalHOC, withSpinnerWhileLoading} from "../modal";
import {injectIntl} from 'react-intl';
import {Form} from 'antd';



export const GET_POSSIBLE_SCALES_QUERY = gql`
    query GET_ELEMENT_SCALES  {
        planbuilder {
            getScales  {
               id
               name
               options
            }
        }
    }
`;

export const withQuery = graphql(
    GET_POSSIBLE_SCALES_QUERY,
    {
        props: ({data}) => {
            if (!data.loading) {

                return {
                    scales: data.planbuilder.getScales,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
)





const enhance = compose(
    injectIntl,
    withQuery,
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
            return props.id ? 'Edit Scale' : 'Add Scale';
        },
    }),
    modalHOC,
)
export default Form.create()(enhance(ScaleElementBuilder));
