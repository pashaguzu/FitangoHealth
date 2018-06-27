import Assessments from '../components/Assessments';
import {compose} from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const GET_PROVIDERS_QUERY  = gql`
 query GET_USER_assessmentsS($user_id:UID, $date: Date) {
  patient(id: $user_id) {
     id
     getAssessments (date:$date) {
         edges {
            id
            assessment {
                id
                name
                isForm
            }
            date
            createdOn
            isCompleted
            completedOn
            totalQuestions
            totalAnswers
            progress
        }
     }
  }
}
`;

const withQuery = graphql(GET_PROVIDERS_QUERY, {
    options: (ownProps) => {
        return{
            variables: {
                user_id:ownProps.user.id,
                date:ownProps.date
            }
        }
    },
    props: ({ data }) => {

        const {patient={}} = data;
        const {getAssessments={}} = patient;
        const {edges=[]} = getAssessments;

        return {loading: data.loading, assessments:edges }
    },
});



const enhance = compose(
    withQuery
);

export default enhance(Assessments);