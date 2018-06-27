//import React from 'react'
import { connect } from 'react-redux'
import MedicationInfo from '../components'
import { message } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import {MedicationPlan_QUERY} from "../../../../../containers";


const deleteMed = gql`
    mutation medicationDelete($id: UID!, $uid: UID!) {
        medicationDelete(id:$id, uid: $uid)
    }
`;



const withMutation = graphql(deleteMed, {
    props: ({ mutate }) => ({
        medicationDelete: (id, uid, date) => {
            return mutate({
                variables: { uid: uid, id: id },

                refetchQueries: [{
                    query: MedicationPlan_QUERY,
                    variables: { user_id: uid, date:date },
                }],

                /*update: (store, { data: { medicationDelete } }) => {
                    // Read the data from our cache for this query.
                    const data = store.readQuery({ query: deleteMed });


                    // Add our comment from the mutation to the end.
                    //data.comments.push(medicationDelete);
                    // Write our data back to the cache.
                    //store.writeQuery({ query: CommentAppQuery, data });
                },*/
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
    deleteMed: (med_id, uid) => {
        // delete medication
        ownProps.medicationDelete(med_id, uid, ownProps.date)
            .then(({data}) => {


                message.warning('Deleted');
                //const token = data.login.token;
                //const user = data.login.user;

                //ownProps.report.id = 0;

                //toggleCoin();

            }).catch((error) => {
            message.error(error.message);
        });
    }
});

export default withMutation(connect(
    mapStateToProps,
    mapDispatchToProps
)(MedicationInfo));