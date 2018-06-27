import {TasksList} from "../../Tasks/index";
import {compose} from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {UserInfoFragment} from "../../../../User/fragments";

const GET_PATIENT_TASKS_QUERY  = gql`
 query GET_USER_TASKS($user_id:UID) {
  patient(id: $user_id) {
     id
     getTasks {
         edges {
            id
            sender {
                ...UserInfo
            }
            title
            endDate
            priority
        }
        totalCount
     }
  }
}
${UserInfoFragment}
`;

const withQuery = graphql(GET_PATIENT_TASKS_QUERY, {
    options: (ownProps) => {
        return{
            variables: {
                user_id:ownProps.userId
            }
        }
    },
    props: ({ data }) => {

        const {patient={}} = data;
        const {getTasks={}} = patient;
        const {edges=[], totalCount=0} = getTasks;

        return {loading: data.loading, tasks:edges, total: totalCount }
    },
});



const enhance = compose(
    withQuery
);

export default enhance(TasksList);