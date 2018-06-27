//import React from 'react'
import { connect } from 'react-redux'

import MedicationCoin from '../components'
import { message } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const reportOnMedication = gql`
    mutation medicationReport($id: UID!, $date: Date!, $input: MedicationInput!) {
        medicationReport(id:$id, date:$date, input: $input) {
             id
            time
            date
            isTaken
        }
    }
`;

const getMedication = gql`
    query getMedication($id: UID!, $date: Date!, $userId: UID!) {
        medication(id:$id, userId: $userId) {
            id
            reports(date:$date) {
                id
                time
                date
                isTaken
            }
        }
        medicationPlan (userId: $userId) {
            id
            progress(date: $date)
        }
    }
`;



const withMutation = graphql(reportOnMedication, {
    props: ({ mutate }) => ({
        medicationReport: (input, userId, id, date) => {
            return mutate({
                variables: { input: input, date:date, id: id },
                refetchQueries: [{
                    query: getMedication,
                    variables: {
                        id: id,
                        userId: userId,
                        date:date
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
    /**
     * Delete Medication
     */
    deleteMed: (med_id) => {
        // delete medication
        ownProps.medicationDelete(med_id)
            .then(({data}) => {
                //const token = data.login.token;
                //const user = data.login.user;

                //ownProps.report.id = 0;
                message.info('Deleted');
                //toggleCoin();

            }).catch((error) => {
            message.error(error.message);
        });
    },
    onClick: (med_id, report, is_taken, toggleCoin) => {
        /*if (!is_taken) {
            report = {};
        }*/
        let new_report = {id:report.id};

        new_report.isTaken = is_taken;
        new_report.date = ownProps.date;
        if (ownProps.time) {
            new_report.time = ownProps.time;
        }

        ownProps.medicationReport({ report: new_report}, ownProps.userId, med_id, ownProps.date)
            .then(({data}) => {
                //const token = data.login.token;
                //const user = data.login.user;

                //ownProps.report.id = 0;
                if (data.medicationReport.isTaken) {
                    message.success('Taken');
                } else {
                    message.info('UnTaken');
                }

            }).catch((error) => {
            message.error(error.message);
        });
    }

});

export default withMutation(connect(
    mapStateToProps,
    mapDispatchToProps
)(MedicationCoin));



