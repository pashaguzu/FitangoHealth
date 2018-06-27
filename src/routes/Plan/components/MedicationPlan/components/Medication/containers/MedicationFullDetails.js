import { connect } from 'react-redux'


import MedicationDetails from '../components/MedicationsFullDetails'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {MedicationSummary, MedicationInfo} from '../components/fragments';

const MED_DETAILS = gql`
query GET_MEDICATION_DETAILS($id:UID!, $userId: UID!, $date: Date) {
            medication(id: $id,userId: $userId) {
                ...MedicationInfo
                ...MedicationSummary
                timesPerHour {
                  id
                  time
                  quantity
                  __typename
                }
                prescription
                period
                prescriber {
                    id
                    fullName
                }
                reactions {
                    id
                    reaction
                    severity
                    createdAt
                }
            }
}
${MedicationSummary}
${MedicationInfo}
`;

const MedicationDetailsWithQuery = graphql(MED_DETAILS,
    {
        options: (ownProps) => {
            return   {
                variables: {
                    userId: ownProps.userId,
                    date: ownProps.date,
                    id: ownProps.id,
                },
                fetchPolicy: 'network-only'
            }},
        props: ({ data }) => {
            if (!data.loading) {
                return {
                    info: data.medication,
                    loading: data.loading
                }
            }
            else {
                return {loading: data.loading}
            }
        },
    }
)(MedicationDetails);


const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
});



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MedicationDetailsWithQuery);
