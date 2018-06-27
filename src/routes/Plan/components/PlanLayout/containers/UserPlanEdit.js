import { connect } from 'react-redux'


import UserPlanEdit from '../components/UserPlanEdit';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const USER_PLAN_INFO = gql`
    query GET_USER_PLAN_SETTINGS ($upid: UID!) {
        userPlan (upid: $upid) {
            id
            startDate
            endDate
            privacy
        }
    }
`;


const UserPlanEditWithQuery = graphql(
    USER_PLAN_INFO,
    {
        options: (ownProps) => ({
            variables: {
                upid: ownProps.id
            }

        }),
        props: ({  data }) => {
            if (!data.loading) {
                return {
                    info: data.userPlan,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
)(UserPlanEdit);


const updatePlan = gql`
    mutation userPlanUpdate($upid:UID!, $input: UserPlanInput!) {
        userPlanUpdate(upid:$upid, input:$input) {
            id
            startDate
            endDate
            privacy
        }
    }

`;
const withMutationUpdate = graphql(updatePlan,
    {
        props: ({ ownProps, mutate }) => ({
            updateUserPlan: input => {
                return mutate({
                    variables: {upid: ownProps.id, input},
                })
            },
        }),
    }
);

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
    return {
        dateFormat:state.user.info.dateFormat,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};


export default withMutationUpdate(connect(
    mapStateToProps,
    mapDispatchToProps
)(UserPlanEditWithQuery));