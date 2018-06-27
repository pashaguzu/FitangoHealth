/**
 * Created by Павел on 12.02.2018.
 */
//import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment';
import ModalMakeCommitmentFor from '../components/ModalMakeCommitmentsFor';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const CHARITIESENUM  = gql`
 query CharitiesEnum {
  charitiesTypes: __type(name: "CharitiesEnum") {
    name
    enumValues {
      name
      description
    }
  }
}
`;
const GET_MOTIVATORS  = gql`
query GET_MOTIVATORS($userId:UID) {
  charitiesTypes: __type(name: "CharitiesEnum") {
    name
    enumValues {
      name
      description
    }
  }
    user (id: $userId) {
        id
        motivation {
            motivators {
                totalCount
                edges {
                    id
                    user {
                        id
                        firstName
                        thumbs {
                            small
                            large
                            medium
                        }
                        email
                    }
                }
            }
        }
    }
}
`;


const MAKECOMMITMENT  = gql`
mutation MAKECOMMITMENT($id: UID!, $input: CommitmentInput!) {
  makeCommitment(id: $id, input: $input) {
    id
    motivators {
      id
    }
    charities
    date
    donate
    payment
    url
    description
  } 
}

`;

const withQuery = graphql(GET_MOTIVATORS, {
    options: (ownProps) => ({
        variables: {
            user_id: ownProps.userId
        }

    }),
    props: ({ownProps, data}) => {
        if (!data.loading) {
            return {
                charitiesEnum: data.charitiesTypes.enumValues,
                motivators: data.user.motivation.motivators,
                loading: data.loading
            }
        }
        else {
            return {loading: data.loading}
        }
    },

})(ModalMakeCommitmentFor);


const withMutation = graphql(MAKECOMMITMENT,
    {
        props: ({ ownProps, mutate }) => ({
            makeCommitment: value => {

                return mutate({
                    variables:{
                        "id":"MjQwMzg",
                        "input":{
                            "date": moment(value.date).format('YYYY-MM-DD'),
                            "description":value.description,
                            "url":value.url,
                            "donate":parseFloat(value.donate),
                            "motivators":value.motivators,
                            "payment":parseFloat(value.payment)
                        }
                    }
                }).then((data) => {


                })
            },
        }),
    }
);
const mapStateToProps = (state) => {
    return {
        userId: state.user.info.id
    };

};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmit: (value) => {
        ownProps.makeCommitment(value).then(({data}) => {

        })
    },
});

export default withMutation(connect(mapStateToProps, mapDispatchToProps)(withQuery));