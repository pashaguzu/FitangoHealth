import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, branch} from 'recompose';
import {HealthElementFragment} from "../fragments";

const GET_DIAGNOSIS_QUERY  = gql`
 query GET_HEALTH_RECORD($id:UID!) {
  health {
     getHealthRecord(id:$id) {
        ...HealthElement
     }
  }
}
${HealthElementFragment}

`;

const withQuery = graphql(GET_DIAGNOSIS_QUERY, {
    options: (ownProps) => {
        return{
            variables: {
                id: ownProps.id
            }
        }
    },
    props: ({ data }) => {
        if (!data.loading) {
            return {
                healthRecord: data.health.getHealthRecord,
                loading: data.loading
            }
        }
        else {
            return {loading: data.loading}
        }
    },
});

// if this is a child - then add children
export const withQueryOrNot = compose(
    branch(props => props.id && props.id !== '', withQuery)
);

export default withQueryOrNot;