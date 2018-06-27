import ProfileManager from '../components/ProfileManager/index';
import { graphql } from 'react-apollo';
import React from 'react';
import {compose, branch, withHandlers, withState, withProps} from 'recompose';
import {Form} from 'antd';
import gql from 'graphql-tag';
import {withModal} from "../../../../../components/Modal/index";

const GET_PROFILE  = gql`
 query GET_PROFILE($user_id:UID) {
  patient(id: $user_id) {
    id
    fullName
    thumbs {
      original
      small
      large
      medium
      wide
    }
    gender
    genderText
     age
     addressText
     phoneFormatted
     birthday
     email
     getUserNetwork {
        id
        joinedDate
        lastLoginDate
     }
     
     getAdherence {
        medications {
            level
            color
            description
        }
        total {
            level
            color
            description
        }
     }
     
     
     getInsurance {
        memberId
        groupNumber
        payer {
            id
            name
        }
     }
    
  }
}


`;
// health {
//     getCurrentCancers {
//         id,
//             title,
//             code
//     }
//     getCurrentStage {
//
//     }
// }

const withQuery = graphql(GET_PROFILE, {
    options: ({patient}) => {
        return {
            variables: {
                id:patient.id ,   
            },
        }
    },
    props: ({ data,ownProps}) => {
        const {patient} = ownProps;
        return {loading: data.loading, patient:patient}
    },
});
const settingUserMutate = gql`
 mutation settingUser($input:UserInput!){
        updateUser(input:$input) {
          id,
          title,
          firstName,
          middleName,
          lastName,
          birthday,
          gender,
          phone {code, number},
          language,
          timezone
          address {
            line1
            line2
            country
            state 
            city
            zipcode
          }
          phoneConfirmed,
          dateFormat
          email
        }
    }
`;
const withMutationEdit = graphql(settingUserMutate, {
    props: ({ownProps:{patient}, mutate }) => ({
        onSubmit: (input) => {
            return mutate({
                variables: {input},
            });
        },
    }),
});
const withQueryMutation = compose(withMutationEdit, withQuery);
const enhance = compose(
    withQueryMutation,
    Form.create(),
    withHandlers({
        onSubmit: props => () => {
            console.log(props, 'Props before input');
            props.form.validateFields((err, values) => {
                console.log(err);
                console.log(values);
                if (!err) {
                    console.log(values);
                    props.onHide();
                    // props.onSubmit(values).then(({data})=> {
                    //     props.onHide();
                    // });
                }
            });
        }
    }),
    withProps(props => {
        return {modalTitle: props.patient ? 'Edit User' : 'Add User'}
    }),
    withModal
);

export default enhance(ProfileManager);