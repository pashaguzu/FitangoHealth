import TumorboardView from '../components/TumorboardView';
import {compose, branch, withProps, withHandlers, withStateHandlers} from 'recompose';
import {withModal, withSpinnerWhileLoading} from "../../../../../components/Modal/index";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {TumorboardFragment} from "./TumorboardManager";
import {GET_TUMORBOARD_QUERY} from "../queries";


// 1- add queries:
const withQuery = graphql(
    GET_TUMORBOARD_QUERY,
    {
        options: (ownProps) => {
            //console.log(ownProps);
            return {
                //skip: !ownProps.tumorboard.id,
                variables: {
                    id: ownProps.tumorboard.id,
                },
            }

        },
        props: ({ ownProps, data }) => {
            let {loading, tumorboard={}} = data;
            if (!loading) {
                tumorboard = data.getTumorboard;
            }
            return {...ownProps, loading, tumorboard};
        },
    }
);

const modalEnhance = compose(
    withProps(props => {
        return {modalTitle: 'View Tumorboard', modalFooter:'close'}
    }),
    withModal
);
const enhance = compose(
    withQuery,
    withSpinnerWhileLoading,
    branch(props => props.asModal, modalEnhance)
)
export default enhance(TumorboardView);