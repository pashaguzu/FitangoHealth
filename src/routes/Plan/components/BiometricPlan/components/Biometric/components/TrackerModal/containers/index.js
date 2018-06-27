/**
 * Created by Pavel on 26.12.2017.
 */
import { connect } from 'react-redux'


import TrackerModalForm from '../components'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {message} from "antd/lib/index";
import {BiometricPlanQuery} from "../../../../../containers";


const tracker = gql`
query GET_TRACKER($id:UID, $user_id: UID!, $amid:UID) {
    biometricPlan ( userId: $user_id) {
        id
        columns {
          id
          name
        }
    }
    tracker (id: $id, userId: $user_id) {
        id,
        measurement (amid:$amid) {
          id
            label
            units {
                id
                name
            }
            inputMask
          graph
        },
        criticalRange {
          min
          max
        },
        normalRange {
          min
          max
        },
        timesToReport,
        columns
        startDate
        endDate
  }
}
`;
const updateTrackerMutate=gql`
 mutation TrackerUpdate($id:UID, $userId: UID!, $input: TrackerInput!) {
        trackerUpdate(id:$id, userId: $userId, input: $input) {
              id,
            measurement {
              id
              label
              graph
            },
            criticalRange {
              min
              max
            },
            normalRange {
              min
              max
            },
            timesToReport,
            columns
        }
    }
`;
const addMutation=gql`
 mutation TrackerAdd($userId: UID!, $input: TrackerInput!) {
        trackerAdd(userId: $userId, input: $input) {
              id,
                measurement {
                  id
                  label
                  graph
                },
                criticalRange {
                  min
                  max
                },
                normalRange {
                  min
                  max
                },
                timesToReport,
                columns
        }
    }
`;



const withQuery = graphql(tracker,
    {
        options: (ownProps) => {

        return   {
            variables: {
                user_id: ownProps.userId,
                id: ownProps.id,
                amid: ownProps.amid,

            },
            fetchPolicy: 'network-only'
        }},
        props: ({ ownProps, data }) => {

            if (!data.loading) {
                return {
                    info: data.tracker,
                    columns: data.biometricPlan.columns,
                    loading: data.loading
                }
            }
            else {
                return {loading: data.loading,info:12}
            }
        },
    }
)(TrackerModalForm);

const withMutation = graphql(updateTrackerMutate, {
    props: ({ ownProps, mutate }) => ({
        updateTracker: (input) => {
            const id = ownProps.id;
            return mutate({
                variables: {id:id, userId:ownProps.userId, input: {details:input}},

                update: (store, { data: { trackerUpdate } }) => {

                    // Read the data from our cache for this query.
                    /*const data = store.readQuery({
                        query: tracker,
                        variables: {
                            id: id,
                            user_id: uid
                        }
                    });*/
                    if (id) {
                        // add new to the list
                    }


                    // Add our comment from the mutation to the end.
                    //data = medicationUpdate;
                    // Write our data back to the cache.
                    if (trackerUpdate.id) {
                        store.writeQuery({
                            query: tracker,
                            data: {tracker: trackerUpdate},
                            variables: {
                                id: trackerUpdate.id,
                                user_id: ownProps.userId
                            }
                        });
                    } else {
                        store.writeQuery({
                            query: tracker,
                            data: {tracker: trackerUpdate},
                            variables: {
                                id: id,
                                user_id: ownProps.userId
                            }
                        });

                    }
                },
            }).then((data) => {
                ownProps.onCancel(data);
                message.success('Saved');
            })},
    }),
});

 const withMutationAdd = graphql(addMutation, {
    props: ({ ownProps, mutate }) => ({
        updateTracker: (input) => {
            return mutate({
                variables: {userId: ownProps.userId, input: {details:input}},
                refetchQueries: [{
                    query: BiometricPlanQuery,
                    variables: { user_id: ownProps.userId, date:ownProps.date },
                }],
            }).then((data) => {
                ownProps.onCancel(data);
                message.success('Saved');
            })},
    }),
});


const mapStateToProps = (state) => {
    return {
        dateFormat:state.user.info.dateFormat
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    // onSubmit: (values) => {
    //     values.birthday = values.birthday.format("YYYY-MM-DD")
    //     values.phone = [values.prefix, values.phone];
    //     delete values.prefix;

    //     ownProps.updateInfo(values).then(({data}) => {

    //     })
    // },
});

export const TrackerAddForm = withMutationAdd(connect(
    mapStateToProps,
    mapDispatchToProps
)(withQuery));

export const TrackerEditForm = withMutation(connect(
    mapStateToProps,
    mapDispatchToProps
)(withQuery));

export default TrackerEditForm;