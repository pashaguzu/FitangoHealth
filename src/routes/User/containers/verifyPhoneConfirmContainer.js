/**
 * Created by Pavel on 09.12.2017.
 */
import { connect } from 'react-redux'

/*  This is a container components. Notice it does not contain any JSX,
 nor does it import React. This components is **only** responsible for
 wiring in the actions and state necessary to render a presentational
 components - in this case, the counter:   */

import VerifyPhoneConfirmForm from '../components/VerifyPhoneConfirm'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {withRouter} from "react-router-dom";
import LoginForm from "../components/Login";
import {updatePhoneConfirm} from "../modules/user";


const verifyPhoneConfirm = gql`
mutation verifyPhoneConfirm($code:String!) {
       verifyPhoneConfirm(code:$code)
    }
`;

const withMutation = graphql(verifyPhoneConfirm, {
    props: ({ ownProps, mutate }) => ({
        verifyPhoneConfirm: (input, userId) => {
            return mutate({
                variables: {code:input.code },
                update: (store, { data: { verifyPhoneConfirm } }) => {


                    // let element = store.readFragment({
                    //     id: 'User:'+userId, // `id` is any id that could be returned by `dataIdFromObject`.
                    //     fragment: LoginForm.fragments.user,
                    //     fragmentName: 'UserInfo'
                    // });


                    //element.phoneConfirmed = verifyPhoneConfirm;

                    store.writeFragment({
                        id: 'User:'+userId,
                        fragment: LoginForm.fragments.user,
                        fragmentName: 'UserInfo',
                        data: {
                            phoneConfirmed: verifyPhoneConfirm,
                            __typename:'User'
                        },
                    });/*



                    // get info from the store
                    const data = store.readFragment({
                        query: UserQuery,
                        variables: {
                            id: id,
                        }
                    });

                    // Write our data back to the cache.
                    store.writeQuery({
                        query: UserQuery,
                        data: {
                            category: {
                                ...data.category,
                                isJoined: false
                            }
                        },
                        variables: {
                            id: id,
                        }
                    });*/
                },
            })},
    }),
});

const mapStateToProps = (state) => {

    return {
        userId: state.user.info.id
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmit: (props, userId) => {
        const{code} = props;

        ownProps.verifyPhoneConfirm({code:code }, userId)
            .then(({data}) => {

                // update user info
                dispatch(updatePhoneConfirm(data.verifyPhoneConfirm));


                //ownProps.history.push('/');

            }).catch((error) => {

        });
    },
});

export default withRouter(withMutation(connect(mapStateToProps, mapDispatchToProps)(VerifyPhoneConfirmForm)));

