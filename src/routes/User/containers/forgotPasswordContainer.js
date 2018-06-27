/**
 * Created by Pavel on 08.12.2017.
 */
//import React from 'react'
import { connect } from 'react-redux'
import { message } from 'antd';


/*  This is a container components. Notice it does not contain any JSX,
 nor does it import React. This components is **only** responsible for
 wiring in the actions and state necessary to render a presentational
 components - in this case, the counter:   */

import ForgotForm from '../components/ForgotPassword';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const forgotPasswordConfirm = gql`
    mutation forgotPasswordConfirm($code:String!,$new_password:String!,$new_password_repeat:String!) {
       forgotPasswordConfirm(code:$code, new_password:$new_password, new_password_repeat:$new_password_repeat
      )
    }
`;

const withMutation = graphql(forgotPasswordConfirm, {
    props: ({ mutate }) => ({
        forgotPasswordConfirm: input => {
            return mutate({
                variables: { code: input.code, new_password: input.new_password,new_password_repeat:input.new_password_repeat },
            })
        },
    }),
});

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmit: (props) => {
        const{new_password,new_password_repeat} = props;
        let {code} = props;

        const code_from_url = ownProps.match.params.code;
        // if the code has been in form - use that one, otherwise - use from url
        code = code || code_from_url;

        ownProps.forgotPasswordConfirm({ code:code, new_password:new_password,new_password_repeat:new_password_repeat})
            .then(({data}) => {

                // redirect to Enter code
                ownProps.history.push('/login');
                // show success message
                message.success('Password has been reset');
            }).catch((error) => {

        });
    },
});

export default withMutation(connect(mapStateToProps, mapDispatchToProps)(ForgotForm));