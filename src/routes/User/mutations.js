import { gql } from 'react-apollo';

export default gql`
    mutation loginUser($input: LoginUserInput!){
        loginUser(input: $input) {
            token,
            user {
                id,
                username
            }
        }
    }
`;