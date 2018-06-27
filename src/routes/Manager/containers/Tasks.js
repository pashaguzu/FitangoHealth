import {TasksList} from "../components/Tasks/index";
import {compose} from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {UserInfoFragment} from "../../User/fragments";

const GET_TASKS_QUERY  = gql`
  query GET_TASKS($patientId:UID) {
      getTasks(patientId: $patientId) {
            totalCount,
            edges{
                id
                sender {
                    ...UserInfo
                }
                title
                endDate
                priority
            }
      }
}

${UserInfoFragment}
`;

const withQuery = graphql(GET_TASKS_QUERY, {
    options: (ownProps) => {
        return{
            variables: {
                patientId:ownProps.userId
            }
        }
    },
    props: ({ data }) => {

        const {patient={}} = data;
        const {motivation={}} = patient;
        const {family={}} = motivation;
        const {edges=[]} = family;

        return {loading: data.loading, members:edges }
    },
});



const enhance = compose(
    withQuery
);

export default enhance(TasksList);