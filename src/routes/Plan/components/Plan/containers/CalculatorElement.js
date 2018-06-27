// import CalculatorElement from '../components/CalculatorElement';
//
// import gql from 'graphql-tag';
// import { graphql } from 'react-apollo';
//
// export const GET_CALCULATOR_RESULT_QUERY = gql`
//     query GET_CALCULATOR_RESULT ($planId: UID!, $id: UID!, $date: DATE!) {
//         plan (id:$planId) {
//             plan
//         }
//     }
// `;
//
// const withQuery = graphql(
//     GET_PATHWAY_CANCERSTAGE_QUERY,
//     {
//         options: (ownProps) => ({
//             variables: {
//                 id: ownProps.calculatorId,
//             }
//         }),
//         props: ({data}) => {
//             if (!data.loading) {
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
//
//
//
// export default withQuery(CalculatorElement);