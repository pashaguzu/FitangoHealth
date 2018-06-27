import { connect } from 'react-redux'


import MedicationSummary from '../components/MedicationSummary'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const Medications_SUMMARY = gql`
query GET_MEDICATIONS_SUMMARY($userId: UID!, $date: Date) {
            medicationPlan(userId: $userId, date: $date) {
                id,
                summary (date:$date)  {
                    date
                }
            }
}
`;

const MedicationSummaryWithQuery = graphql(Medications_SUMMARY,
    {
        options: (ownProps) => {
            return   {
                variables: {
                    userId: ownProps.userId,
                    date: ownProps.date,

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
)(MedicationSummary);


const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
});



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MedicationSummaryWithQuery);
