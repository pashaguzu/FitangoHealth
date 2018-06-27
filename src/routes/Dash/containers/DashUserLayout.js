import { connect } from 'react-redux'
import DashLayout from 'routes/Dash/components/DashUserLayout'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import Plan from 'routes/Plan/components/Plan';
import {MedicationsByType} from 'routes/Plan/components/MedicationPlan/components/Medication/components/fragments';
import Biometric from 'routes/Plan/components/BiometricPlan/components/Biometric/components';


// Query for grabbing everything for the dashboard items
export const DASH_QUERY = gql`
    query GET_DASH_PLANS ($user_id: UID!, $date: Date, $status: UserPlanStatusEnum)  {
        user (id:$user_id) {
            id
            plans (status: $status) {
                id
                plan {
                    ...PlanCardInfo
                    progress
                }
            }
        }
         medicationPlan (userId: $user_id) {
                id
                upid
                isPersonal
                progress(date: $date)
                ...MedicationsByType
                textBefore
                textAfter
                
            }
            biometricPlan (userId: $user_id) {
                id
                upid
                isPersonal
                progress(date: $date)
                columns {
                    id
                    name
                }
                trackers (date: $date) {
                    ...BiometricCardInfo
                    columns
                }
                startDate
                endDate
            }
    }
   
    
    ${Plan.fragments.plan}
    ${MedicationsByType}
    ${Biometric.fragments.tracker}
`;
/*
 takeAtTimes {
        ...MedicationCardInfo
        timesPerHour {
            id
            time
            quantity
        }
    }
 */

const DashLayoutWithQuery = graphql(
    DASH_QUERY,
    {
        props: ({ data }) => {
            if (!data.loading) {
                return {
                    plans: data.user.plans,
                    medicationPlan: data.medicationPlan,
                    loading: data.loading,
                }

            } else {
                return {loading: data.loading}
            }
        },
        options: (ownProps) => ({
            variables: {
                user_id:ownProps.user_id,
                date:ownProps.date,
                status: 'active'
            },
            fetchPolicy: 'network-only'
        }),
    }
)(DashLayout);

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
    return {
        date: moment().format('YYYY-MM-DD'),
        user_id: state.user.info.id,
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {

    return {
        /*increment: (info) => {dispatch(increment(info))},
        doubleAsync*/
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashLayoutWithQuery);