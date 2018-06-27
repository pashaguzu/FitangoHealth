import Programs from "../components/Programs";
import {compose} from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {UserInfoFragment} from "../../../../User/fragments";

const GET_PATIENT_Programs_QUERY  = gql`
 query GET_USER_Programs($user_id:UID) {
  patient(id: $user_id) {
     id
     getPrograms {
         edges {
            id
            provider {
                id
                name
            }
            joinedDate
            sender {
                ...UserInfo
            }
        }
        totalCount
     }
  }
}
${UserInfoFragment}
`;

const withQuery = graphql(GET_PATIENT_Programs_QUERY, {
    options: (ownProps) => {
        return{
            variables: {
                user_id:ownProps.user.id
            }
        }
    },
    props: ({ data }) => {

        const {patient={}} = data;
        const {getPrograms={}} = patient;
        const {edges=[], totalCount=0} = getPrograms;

        return {loading: data.loading, programs:edges, total: totalCount }
    },
});



const enhance = compose(
    withQuery
);

export default enhance(Programs);