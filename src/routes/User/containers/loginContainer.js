//import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'react-apollo';
import { message } from 'antd';
import { loginUserSuccess, loginUserError} from '../modules/login'
import {loadUser, loadUserFAIL, loadUserPrepare} from '../modules/user'

import LoginForm from '../components/Login'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
const UserMainInfo_QUERY = gql`
    query ACCOUNT_INFO {
        account {
            ...CurrenUserInfo
            possibleNetworkRoles
            possibleProviderRoles
            currentRole
        }
    }
    ${LoginForm.fragments.user}
`;
const loginUser = gql`
    mutation loginUser($input: LoginInput!) {
        login(input: $input) {
           ...CurrenUserInfo
            possibleNetworkRoles
            possibleProviderRoles
            currentRole
            checkToken
        }
    }
    ${LoginForm.fragments.user}
`;
const forgotPassword = gql`
    mutation forgotPassword($email:Email!) {
       forgotPassword(email:$email)
    }

`;
const withMutationForgot = graphql(forgotPassword,
    {
        props: ({ mutate }) => ({
            forgotPassword: input => {
                return mutate({
                    variables: { email: input.email},
                })
            },
        }),
    }
);
const withMutation = graphql(loginUser, {
    props: ({ mutate }) => ({
        loginUser: input => {
            return mutate({
                variables: { input: {email: input.email, password: input.password}},
                // update query

                update: (store, { data: { login} }) => {

                    // Read the data from our cache for this query.
                    const data = store.readQuery({
                        query: UserMainInfo_QUERY,
                    });

                    const newData = {...data, ...{account: {...data.account, ...login}}};

                    store.writeQuery({
                        query: UserMainInfo_QUERY,
                        data: newData
                    });
                }
            })
        },
    }),
});
const mapStateToProps = (state) => {
    return {
        allowSignUp: state.network.allowSignUp,
        token: state.user.token,
        loading: state.user.loading
    };
};
const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmit: (props) => {
        const{email, password} = props;
        dispatch(loadUserPrepare());
        ownProps.loginUser({ email:email, password:password })
            .then(({data}) => {
                const token = data.login.token;
                let user = data.login.user;
                user.token = token;
                dispatch(loadUser(user));
                //dispatch(setUserToken(token));

                dispatch(loginUserSuccess({token}));
            }).catch((error) => {

                dispatch(loadUserFAIL({ error,
                }));
                dispatch(loginUserError({
                    error,
                }));
                //message.error(error.message);


        });
    },
    onClick: ({forgot_email}) => {
        ownProps.forgotPassword({ email:forgot_email})
            .then(({data}) => {

                // redirect to Enter code
                ownProps.history.push('/password/reset');
                // show success message
                message.success('Reset password link has been sent');

            });/*.catch((error) => {


        });*/


    },
});
export default compose(withMutation,withMutationForgot,connect(mapStateToProps, mapDispatchToProps))((LoginForm));






