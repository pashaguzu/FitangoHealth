import { connect } from 'react-redux'
import { withApollo,graphql } from 'react-apollo';
import gql from 'graphql-tag';
import LogoutForm from '../components/Logout'
import { logoutUser } from '../modules/user';
import { NETWORK_INFO_QUERY } from '../../../components/App';

const logoutUserQuery = gql`
    mutation logout{
        logout
    }
`;



const LogoutFormWithMutation = graphql(
    logoutUserQuery
);


const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    logout: () => {
        //console.log('Logout');
        ownProps.mutate({
            refetchQueries: [{
                query: NETWORK_INFO_QUERY,
            }],
        }).then((data) => {

            if (!data.loading) {
                ownProps.client.resetStore();
                dispatch(logoutUser());


                ownProps.history.push('/')

            }
        })
    },
});

export default withApollo(LogoutFormWithMutation(connect(
    mapStateToProps,
    mapDispatchToProps
)(LogoutForm)));