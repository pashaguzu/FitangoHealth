//import React from 'react'
import { connect } from 'react-redux'

import Tracker from '../components/Tracker'
import { message } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const reportOnTracker = gql`
    mutation trackerReport($id: UID!, $input: TrackerInput!) {
        tracker(id:$id, input: $input) {
             id
        }
    }
`;


const withMutation = graphql(reportOnTracker, {
    props: ({ mutate }) => ({
        trackerReport: (input, id) => {
            return mutate({
                variables: { input: input, id: id },
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
        /*if (!is_taken) {
            report = {};
        }*/
        /*let new_report = {};

        new_report.isTaken = is_taken;
        new_report.date = ownProps.date;
        if (ownProps.time) {
            new_report.time = ownProps.time;
        }*/

        //const input = {value:value,date:date};
        ownProps.trackerReport({report:report, list_id:list_id}, amid)
            .then(({data}) => {

                message.success('Reported');

                //const token = data.login.token;
                //const user = data.login.user;

                //ownProps.report.id = 0;

                //toggleCoin();

            }).catch((error) => {
            message.error(error.message);
        });
    }

});
export default withMutation(connect(mapStateToProps, mapDispatchToProps)(Tracker));






