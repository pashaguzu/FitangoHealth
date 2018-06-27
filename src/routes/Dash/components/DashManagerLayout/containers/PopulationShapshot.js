import PopulationShapshot from '../components/PopulationShapshot';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const GET_POPULATION_SNAPSHOT_QUERY = gql`
    query GET_POPULATION_SNAPSHOT {
      management {
        getPopulationShapshot {
          riskLevel {
            name
            value
            color
          }
          medicationAdherence {
            name
            value
            color
            date
          }
          engagement {
            name
            value
            color
          }
        }
      }
    }
`;

const withQuery = graphql(
    GET_POPULATION_SNAPSHOT_QUERY,
    {
        options: () => {
            return {
                fetchPolicy: 'network_only'
            }
        },
        props: ({ data }) => {
            if (!data.loading) {
                return {
                    snapshot: data.management.getPopulationShapshot,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
)

export default withQuery(PopulationShapshot);