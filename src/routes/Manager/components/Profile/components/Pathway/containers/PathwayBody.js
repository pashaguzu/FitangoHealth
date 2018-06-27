import PathwayBody from '../components/PathwayBody';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {PlanElementPureFragment} from "../../../../../../Plan/components/Plan/fragments";

const GET_PATHWAY_QUERY  = gql`
 query GET_PATHWAY ($id: UID!) {
  getPathway (id:$id) {
    id
    title
    elements {
        ...PlanElement
    }
    cancer {
        id
        stage {
            id
            letters
            rules {
                id
                stage 
                options {
                    id
                    letter
                    name
                }
            }
        }
    }
  }
}

${PlanElementPureFragment}

`;

const withQuery = graphql(GET_PATHWAY_QUERY, {
    options: (ownProps) => {
        return {
            variables: {
                id: ownProps.id,
            },
        }
    },
    props: ({ data }) => {
        if (!data.loading) {
            return {
                pathway: data.getPathway,
                loading: data.loading
            }
        }
        else {
            return {loading: data.loading}
        }
    },
});

export default withQuery(PathwayBody);