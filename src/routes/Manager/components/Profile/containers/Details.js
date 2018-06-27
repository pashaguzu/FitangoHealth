import Details from '../components/Details';
import {compose} from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
// import {UserInfoFragment} from "../../../../User/fragments";
//
// const GET_PROVIDERS_QUERY  = gql`
//  query GET_USER_QUAL_MEASURES($user_id:UID) {
//   patient(id: $user_id) {
//      id
//      getCohorts {
//          edges {
//             id
//             cohort {
//                 id
//                 title
//                 codes {
//                     id
//                     code
//                 }
//             }
//             startDate
//         }
//      }
//   }
// }
//
// `;
//
// const withQuery = graphql(GET_PROVIDERS_QUERY, {
//     options: (ownProps) => {
//         return{
//             variables: {
//                 user_id:ownProps.user.id
//             }
//         }
//     },
//     props: ({ data }) => {
//
//         const {patient={}} = data;
//         const {getCohorts={}} = patient;
//         const {edges=[]} = getCohorts;
//
//         return {loading: data.loading, cohorts:edges }
//     },
// });



const enhance = compose(
   // withQuery
);

export default enhance(Details);