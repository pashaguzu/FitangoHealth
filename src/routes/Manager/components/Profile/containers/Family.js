import React from 'react';
import Family from '../components/Family';
import {compose,withStateHandlers} from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {UserInfoFragment} from "../../../../User/fragments";

const GET_FAMILY_QUERY  = gql`
 query GET_USER_family($user_id:UID) {
  patient(id: $user_id) {
     id
     motivation {
            family {
                totalCount,
                edges{
                    id,
                    user {
                        ...UserInfo
                        phoneFormatted
                    }
                    joinedDate
                    roleText
                    canReport
                }
            }
     }
  }
}

${UserInfoFragment}
`;

const withQuery = graphql(GET_FAMILY_QUERY, {
    options: (ownProps) => {
        return{
            variables: {
                user_id:ownProps.user.id
            }
        }
    },
    props: ({ data }) => {

        const {patient={}} = data;
        const {motivation={}} = patient;
        const {family={}} = motivation;
        const {edges=[]} = family;

        return {loading: data.loading, members:edges }
    },
});



const enhance = compose(
    withQuery,
    withStateHandlers(
        (props) => (
            {
            searchText: '',
        }),
        {        
            onSearch: ({searchText},props) =>(value) => (
                {
                    searchText: value.target.value,
                    members: props.members.map((record) => {
                        console.log(record);
                        const match = record.user.fullName.match(new RegExp(searchText, 'gi'));
                        if (!match) {
                            return null;
                        }                        
                        return {
                            ...record,
                            fullName: (
                                <span>
                      {record.user.fullName.split( new RegExp(searchText, 'gi')).map((text, i) => (
                      i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                      ))}
                    </span>
                            ),
                        };
                    }).filter(record => !!record),
            }),
            emitEmpty: ({searchText}) =>(value) => (
                {
                    searchText: ''
                     })
            })        

);


export default enhance(Family);