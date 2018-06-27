import News from '../components/News';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const GET_USER_NEWS_QUERY = gql`
    query GET_USER_NEWS {
        getMainCategoriesNews {
            totalCount
            edges {
               id
               title
               textPure
            }
            
        }
    }
`;

const withQuery = graphql(
    GET_USER_NEWS_QUERY,
    {
        options: (ownProps) => ({
            variables: {
                userId: ownProps.userId,
            }
        }),
        props: ({data}) => {
            if (!data.loading) {
                return {
                    items: data.getMainCategoriesNews.edges,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
);



export default withQuery(News);