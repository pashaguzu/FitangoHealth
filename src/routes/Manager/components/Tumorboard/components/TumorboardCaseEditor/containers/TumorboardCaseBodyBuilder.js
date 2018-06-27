import TumorboardCaseBodyBuilderPure from '../components/TumorboardCaseBodyBuilder';
// import { graphql, compose } from 'react-apollo';
// import gql from 'graphql-tag';
// import {TumorboardFragment} from "../../../../../../Tumorboard/containers/TumorboardManager";
//
// const GET_PATIENT_TUMORBOARD_QUERY  = gql`
//     query GET_PATIENT_TUMORBOARD ($userId: UID!) {
//         getPatientTumorboard (userId:$userId) {
//             ...TumorboardInfo
//         }
//     }
//     ${TumorboardFragment}
// `;
//
// const withQuery = graphql(GET_PATIENT_TUMORBOARD_QUERY, {
//     options: (ownProps) => {
//         return {
//             variables: {
//                 userId: ownProps.userId,
//             },
//         }
//     },
//     props: ({ ownProps, data }) => {
//         const {tumorboard} = ownProps;
//         const {getPatientTumorboard=tumorboard} = data;
//         return {loading: data.loading, tumorboard:getPatientTumorboard};
//     },
// });


export const TumorboardCaseBodyBuilder = TumorboardCaseBodyBuilderPure;//withQuery(TumorboardCaseBodyBuilderPure);
export default TumorboardCaseBodyBuilder;