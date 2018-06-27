/**
 * Created by Pavel on 26.12.2017.
 */
import MedicationEditForm from '../components'
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {message} from 'antd';
import {MedicationPlan_QUERY} from "../../../../../containers";


const medication = gql`
query GET_MEDICATION($user_id: UID!, $id:UID, $drugId:UID) {
            medication(id: $id, userId: $user_id) {
                id,
                startDate,
                endDate,
                sideEffects,
                purpose,
                directions,
                timesPerDay,
                timesPerHour {
                  id,
                  time,
                  quantity
                },
                type,
                drug (id:$drugId) {
                  id
                  name
                  dosage
                },
                quantity
            }
}
`;
const editMutation = gql`
 mutation MedicationUpdate($id: UID!, $userId: UID!, $input: MedicationInput!) {
        medicationUpdate(id:$id, userId: $userId, input: $input) {
             id,
                startDate,
                endDate,
                sideEffects,
                purpose,
                directions,
                timesPerDay,
                timesPerHour {
                  id,
                  time,
                  quantity
                },
                type,
                drug {
                  id
                  name
                  dosage
                },
                quantity
        }
    }
`;
const addMutation = gql`
 mutation MedicationAdd($userId: UID!, $input: MedicationInput!) {
        medicationAdd(userId: $userId, input: $input) {
             id,
                startDate,
                endDate,
                sideEffects,
                purpose,
                directions,
                timesPerDay,
                timesPerHour {
                  id,
                  time,
                  quantity
                },
                type,
                drug {
                  id
                  name
                  dosage
                },
                quantity
        }
    }
`;

const MedicationEditWithQuery = graphql(medication,
    {
        options: (ownProps) => {
            return {
                variables: {
                    user_id: ownProps.userId,
                    id: ownProps.id,
                    drugId: ownProps.drugId,

                },
                fetchPolicy: 'network-only'
            }
        },
        props: ({ data}) => {
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
)(MedicationEditForm);

const withMutation = graphql(editMutation, {
    props: ({mutate}) => ({
        updateMedication: (id, uid, input, date, onCancel) => {
            return mutate({
                variables: {id: id, userId: uid, input: {details: input}},
                /*refetchQueries: [{
                    query: editMutation,
                    variables: {
                        id: id,
                        user_id: uid
                    },
                }],*/
                refetchQueries: [{
                    query: MedicationPlan_QUERY,
                    variables: {user_id: uid, date: date},
                }],
                /*update: (store, { data: { medicationUpdate } }) => {

                    // Read the data from our cache for this query.
                    const data = store.readQuery({
                        query: medication,
                        variables: {
                            id: id,
                            user_id: uid
                        }
                    });
                    if (id) {
                        // add new to the list
                    }


                    // Add our comment from the mutation to the end.
                    //data = medicationUpdate;
                    // Write our data back to the cache.
                    store.writeQuery({
                        query: medication,
                        data: {medication: medicationUpdate},
                        variables: {
                            id: id,
                            user_id: uid
                        }});
                },*/
            }).then((data) => {
                onCancel(data);
                message.success('Saved');
            })
        },
    }),
});


 const withMutationAdd = graphql(addMutation, {
    props: ({mutate}) => ({
        updateMedication: (id, uid, input, date, onCancel) => {
            return mutate({
                variables: {userId: uid, input: {details: input}},
                refetchQueries: [{
                    query: MedicationPlan_QUERY,
                    variables: {user_id: uid, date: date},
                }],
            }).then((data) => {
                onCancel(data);
                message.success('Saved');
            })
        },
    }),
});

// const mapStateToProps = (state) => {
//
//     return {
//         dateFormat: state.user.info.dateFormat
//     };
// };
//
// const mapDispatchToProps = (dispatch, ownProps) => ({
//     // onSubmit: (values) => {
//     //     values.birthday = values.birthday.format("YYYY-MM-DD")
//     //     values.phone = [values.prefix, values.phone];
//     //     delete values.prefix;
//
//     //     ownProps.updateInfo(values).then(({data}) => {
//
//
//     //     })
//     // },
// });


export const MedicationAddForm = withMutationAdd(MedicationEditWithQuery);

export default withMutation(MedicationEditWithQuery);
