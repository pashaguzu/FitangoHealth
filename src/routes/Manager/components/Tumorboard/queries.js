import {compose, branch, withHandlers, withState, withProps} from 'recompose';
import {TumorboardFragment} from "./fragments";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const GET_TUMORBOARD_QUERY = gql`    
    query GET_TUMORBOARD ($id: UID!) {
        getTumorboard (id:$id) {
            ...TumorboardInfo
        }
    }
    ${TumorboardFragment}
`;

export const withTumorboardQuery = graphql(
    GET_TUMORBOARD_QUERY,
    {
        options: ({tumorboard}) => {
            return {
                variables: {
                    id: tumorboard.id,
                },
                //fetchPolicy: 'network-only'
            }
        },
        props: ({ ownProps, data }) => {
            const {getTumorboard:tumorboard=ownProps.tumorboard} = data;
            //console.log(tumorboard, 'tumorboard');
            return {...ownProps, loading: data.loading, tumorboard}
        },
    }
);

export let TumorobardQueryOptions = {
    query: GET_TUMORBOARD_QUERY,
    fetchPolicy: 'cache-first'
}
