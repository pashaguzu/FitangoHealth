/**
 * Created by Pavel on 09.12.2017.
 */
import { connect } from 'react-redux'
//import React from 'react'
/*  This is a container components. Notice it does not contain any JSX,
 nor does it import React. This components is **only** responsible for
 wiring in the actions and state necessary to render a presentational
 components - in this case, the counter:   */

import VerifyPhoneForm from '../components/VerifyPhone'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const verifyPhone = gql`
   mutation verifyPhone($phone:PhoneInput!) {
       verifyPhone(phone:$phone)
    }
`;
const getPhone = gql`
   query getPhone {
    account
    {
      user {
          id
          phone
      }
    }
}
`;

const withMutation = graphql(verifyPhone, {
    props: ({ mutate }) => ({
        verifyPhone: ({phone}) => {
            return mutate({
                variables: {phone},
            })},
    }),
});

const withQuery = graphql(getPhone,
    {
        props: ({ ownProps, data }) => {
            if (!data.loading) {

                return {
                    phone: data.account.user.phone,
                    loading: data.loading
                }

            } else {
                return {loading: data.loading}
            }
        },
    }
)(VerifyPhoneForm);


const mapStateToProps = (state) => {
    return {
        phone: state.user.info.phone
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmit: ({phone},showCode) => {
        ownProps.verifyPhone({phone})
            .then(({data}) => {

                if(data.verifyPhone){
                    showCode();
                }

            }).catch((error) => {
        });
    },
});

export default withMutation(connect(
    mapStateToProps,
    mapDispatchToProps
)(withQuery));


//export default withMutation(connect(mapStateToProps, mapDispatchToProps)(VerifyPhoneForm));
