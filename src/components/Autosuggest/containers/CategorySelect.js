import CategorySelect from '../components/CategorySelect';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'

export const CategorySelectQUERY = gql`
 query GET_MAIN_CATEGORY($isMedical:Boolean) {
getMainCategories(isMedical:$isMedical){
  name
  id  
}
}
`;



const CategorySelectWithQuery = graphql(CategorySelectQUERY,
    {
        options: () => {
            return {
                //fetchPolicy: 'network-only'
            }
        },
        props: ({ data }) => {
            if (!data.loading) {
                return {
                    items: data.getMainCategories,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },

    }
);




export default withApollo(CategorySelectWithQuery(CategorySelect));