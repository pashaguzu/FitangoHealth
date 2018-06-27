import Records from '../components/Records';
import { connect } from 'react-redux'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const GET_Records_QUERY = gql`    
    query GET_HEALTH_RECORDS ($userId:UID)  {
        patient(id:$userId) {
            id
            healthRecords {
              totalCount
              edges {
                id
                type
                typeText
                title
                createdAt
                isActive
                riskLevel
              }
            }
          }
    }
`;

const RecordsWithQuery = graphql(
    GET_Records_QUERY,
    {
        options: (ownProps) => ({
            variables: {
                userId: ownProps.userId
            }

        }),
        props: ({  data }) => {
            if (!data.loading) {
                const {totalCount, edges} = data.patient.healthRecords;
                return {
                    healthRecords: edges,
                    totalCount: totalCount,
                    loading: data.loading,
                }

            } else {
                return {loading: data.loading}
            }
        },
    }
)(Records);



const mapStateToProps = (state) => {
    return {
        userId: state.user.info.id
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(RecordsWithQuery);