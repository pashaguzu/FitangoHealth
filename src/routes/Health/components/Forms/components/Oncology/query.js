import {graphql} from 'react-apollo';
import gql from 'graphql-tag';


export const GET_ONCOLOGY_ENUMS_QUERY = gql`
    query GET_ONCOLOGY_ENUMS {
        
         oncologyTypes: __type(name: "OncologyTypeEnum") {
            name
            enumValues {
              name
              description
            }
        }
        
        oncologyDisorders: __type(name: "OncologyDisorderEnum") {
            name
            enumValues {
              name
              description
            }
        }
        
        oncologyBehaviors: __type(name: "OncologyBehaviorEnum") {
            name
            enumValues {
              name
              description
            }
        }
        
        
    }
`;


// 1- add queries:
export const withOncologyEnumsQuery = graphql(
    GET_ONCOLOGY_ENUMS_QUERY,
    {
        props: ({data}) => {
            if (!data.loading) {
                return {
                    oncologyTypes: data.oncologyTypes.enumValues,
                    oncologyDisorders: data.oncologyDisorders.enumValues,
                    oncologyBehaviors: data.oncologyBehaviors.enumValues,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
)