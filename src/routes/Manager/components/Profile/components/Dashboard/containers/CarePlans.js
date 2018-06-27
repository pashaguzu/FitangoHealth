import CarePlans from '../components/CarePlans';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {PlanCardFragment} from "../../../../../../Plan/components/Plan/fragments";

export const USER_CAREPLANS_QUERY = gql`    
    query GET_USER_CAREPLANS ($user_id:UID, $type: String, $status:UserPlanStatusEnum)  {
            patient (id:$user_id) {
              id
              getPlans (status: $status, type: $type)  {
                  id
                  plan {
                    ...PlanCardInfo
                  }
                  startDate
                  endDate
                  adherence {
                    level
                    color
                  }
              }
            }
    }
    ${PlanCardFragment}
`;

const withQuery = graphql(
    USER_CAREPLANS_QUERY,
    {
        options: (ownProps) => ({
            variables: {
                user_id: ownProps.user.id,
                status: 'active',
                type: 'careplan'
            }
        }),
        props: ({data}) => {
            if (!data.loading) {
                return {
                    plans: data.patient.getPlans,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
);



export default withQuery(CarePlans);