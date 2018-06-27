import { connect } from 'react-redux'

import GetPlanstorePlan from '../components/GetPlanstorePlan'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const getPlanMutation = gql`
    mutation getPlan($id: UID!, $input:UserPlanInput!){
        getPlan(id:$id, input:$input) {
            id
        }
    }
`;



const withMutation = graphql(getPlanMutation, {
    props: ({ ownProps, mutate }) => ({
        getPlanstorePlan: (input) => {
            return mutate({
                variables: { id: ownProps.plan.id, input: input}
            })
        },

    }),
});
/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
    return {
        dateFormat: state.user.info.dateFormat
    };
};

const mapDispatchToProps = () => {
    return {
    }
};


export default withMutation(connect(
    mapStateToProps,
    mapDispatchToProps
)(GetPlanstorePlan));