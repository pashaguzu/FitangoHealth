import QualMeasures from '../components/QualMeasures';
import {compose} from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const GET_PROVIDERS_QUERY  = gql`
 query GET_USER_QUAL_MEASURES($user_id:UID) {
  patient(id: $user_id) {
     id
     getQualityMeasures {
         edges {
            id
            qualityMeasure {
                id
                title
            }
            date
        }
     }
  }
}
`;

const withQuery = graphql(GET_PROVIDERS_QUERY, {
    options: (ownProps) => {
        return{
            variables: {
                user_id:ownProps.user.id
            }
        }
    },
    props: ({ data }) => {

        const {patient={}} = data;
        const {getQualityMeasures={}} = patient;
        const {edges=[]} = getQualityMeasures;

        return {loading: data.loading, qms:edges }
    },
});



const enhance = compose(
    withQuery
);

export default enhance(QualMeasures);