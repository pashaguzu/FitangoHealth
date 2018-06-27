import {CancerStageElement, enhance} from '../components/CancerStage';

//
// import gql from 'graphql-tag';
// import { graphql } from 'react-apollo';
//
// export const GET_PATHWAY_CANCERSTAGE_QUERY = gql`
//     query GET_PATHWAY_STAGES ($id: UID!) {
//         getPathway (id:$id) {
//             id
//             title
//             cancer {
//                 id
//                 stage {
//                     id
//                     letters
//                     rules {
//                         id
//                         stage
//                         options {
//                             id
//                             letter
//                             name
//                         }
//                     }
//                 }
//             }
//           }
//     }
// `;
//
// const withQuery = graphql(
//     GET_PATHWAY_CANCERSTAGE_QUERY,
//     {
//         options: (ownProps) => ({
//             variables: {
//                 userId: ownProps.userId,
//             }
//         }),
//         props: ({data}) => {
//             if (!data.loading) {
//
//                 return {
//                     diagnoses: data.patient.healthRecords.edges,
//                     loading: data.loading,
//                 }
//             } else {
//                 return {loading: data.loading}
//             }
//         },
//     }
// );


export const CancerStage = CancerStageElement;

export default CancerStage;