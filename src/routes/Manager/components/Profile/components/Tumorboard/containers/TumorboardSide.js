import TumorboardSide from '../components/TumorboardSide';
//
// import { graphql } from 'react-apollo';
// import gql from 'graphql-tag';
// import {TumorboardFragment} from "../../../../Tumorboard/containers/TumorboardManager";
//
// const GET_PATIENT_TUMORBOARD_QUERY  = gql`
//  query GET_PATIENT_TUMORBOARD ($userId: UID!) {
//   getPatientTumorboard (userId:$userId) {
//      ...TumorboardInfo
//   }
// }
//
// ${TumorboardFragment}
//
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
//         const {getPatientTumorboard} = data;
//         return {loading: data.loading, tumorboard:getPatientTumorboard};
//     },
// });

export default (TumorboardSide);