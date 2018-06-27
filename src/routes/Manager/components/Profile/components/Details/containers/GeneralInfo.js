import GeneralInfo from '../components/GeneralInfo';
import {compose} from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {PatientInfoFragment} from "../../../../../../User/fragments";

const GET_USER_DETAILS_QUERY  = gql`
 query GET_USER_DETAILS($user_id:UID) {
  patient(id: $user_id) {
     ...UserInfo
     genderText
     age
     addressText
     phoneFormatted
     birthday
     email
     getUserNetwork {
        id
        joinedDate
        lastLoginDate
     }
     
     getAdherence {
        medications {
            level
            color
            description
        }
        total {
            level
            color
            description
        }
     }
     
     
     getInsurance {
        memberId
        groupNumber
        payer {
            id
            name
        }
     }
  }
}

${PatientInfoFragment}
`;

const withQuery = graphql(GET_USER_DETAILS_QUERY, {
    options: (ownProps) => {
        return{
            variables: {
                user_id:ownProps.user.id
            }
        }
    },
    props: ({ data }) => {

        const {patient={}} = data;

        return {loading: data.loading, user:patient }
    },
});



const enhance = compose(
    withQuery
);


export default enhance(GeneralInfo);