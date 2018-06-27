//import React from 'react'
import { connect } from 'react-redux'

import TrackerField from '../components'
import { message } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


export const reportOnTracker = gql`
    mutation trackerReport($id: UID!, $input: TrackerReportInput!) {
        trackerReport(id:$id, input: $input) {
             id
        }
    }
`;

export const getTrackerProgress = gql`
    query GET_BIOMETRIC_PLAN_PROGRESS ($userId: UID!, $date: Date)  {
            biometricPlan (userId: $userId) {
                id
                progress(date: $date)
            }
    }
`;


const withMutation = graphql(reportOnTracker, {
    props: ({ ownProps, mutate }) => ({
        trackerReport: (input, id) => {
            return mutate({
                variables: { input: input, id: id },
                refetchQueries: [{
                    // after we reported - refetch tracker adherence
                    query: getTrackerProgress,
                    variables: {
                        userId: ownProps.userId,
                        date:ownProps.date
                    },
                }],
            })
        },
    }),
});


const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange: (amid, report, list_id) => {
        ownProps.trackerReport(report, amid)
            .then(({data}) => {
                console.log(ownProps);
                const measurementLabel = ownProps.info.measurement.label;
                message.success(measurementLabel+ ' Reported');
            }).catch((error) => {
            message.error(error.message);
        });
    }

});
export default withMutation(connect(mapStateToProps, mapDispatchToProps)(TrackerField));






