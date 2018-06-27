// /**
//  * Created by Pavel on 07.12.2017.
//  */
// import React, { Component, PropTypes } from 'react';
// import { graphql } from 'react-apollo';
// import gql from 'graphql-tag';
//
// export class NewEntry extends Component {
//     render() {
//         return <div onClick={() => this.props.submit('apollostack/apollo-clients')}>Click me</div>;
//     }
// }
//
// export const submitRepository = gql`
//      mutation loginUser($input: LoginInput!) {
//         login(input: $input) {
//             user {
//                 id,
//                 first_name,
//                 last_name,
//                 token,
//                 new_notifications,
//                 new_messages
//             }
//             token
//         }
//     }
// `;
//
// export const withData = graphql(submitRepository, {
//     props: ({ mutate }) => ({
//         submit: (repoFullName) => mutate({ variables: { repoFullName } }),
//     }),
// });
// export default withData(NewEntry);