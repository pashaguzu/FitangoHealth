import RightMenu from '../components/RightMenu';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import LoginForm from "../../../../routes/User/components/Login";

export const GET_ACCOUNT_MENU_INFO_QUERY  = gql`
  query GET_ACCOUNT_MENU_INFO {
    account {
        ...CurrenUserInfo
        possibleNetworkRoles
        possibleProviderRoles
        currentRole
    }
}
     ${LoginForm.fragments.user}

`;

const withQuery = graphql(GET_ACCOUNT_MENU_INFO_QUERY, {
    options: (ownProps) => {
        return {
            fetchPolicy: 'cache-only'
        }
    },
    props: ({ ownProps, data }) => {

        const {account} = data;
        //const
        //const newNotifications = data.account ? data.account.user.notifications : [];
        //const totalNewNotifications =  data.account ? data.account.user.notifications.totalCount : 0;

        return {user: account.user, account:account || {}};//{loading: data.loading, newNotifications:newNotifications, totalNewNotifications:totalNewNotifications}
    },
});


export default  withQuery(RightMenu);
/*
const mapStateToProps = (state) => {
    return {
        // view store:
        // currentView:  state.views.currentView,
        // userAuth:
        //network: state.network,
        //loading: state.user.loading,
        //user: state.user.info,
        //token: state.user.token,
        //lastCursor: state.user.info.notifications.pageInfo.endCursor
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default  withQuery(connect(
    mapStateToProps,
    mapDispatchToProps
)(RightMenu));*/