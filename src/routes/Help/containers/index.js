import Help from '../components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const GET_HELP_QUERY = gql`    
    query GET_HELP  {
        glossary {
            subject
            text
          }
         faq {
            subject
            text
            children {
                subject
                text
                children {
                    subject
                    text
                }
            }
          }
    }
`;

const HelpWithQuery = graphql(
    GET_HELP_QUERY,
    {
        props: ({  data }) => {
            if (!data.loading) {


                return {
                    glossary: data.glossary,
                    faq: data.faq,
                    loading: data.loading,
                }

            } else {
                return {loading: data.loading, glossary:[], faq:[]}
            }
        },
    }
)(Help);


export default HelpWithQuery;