import TeamManager from '../components/TeamManager/index';
import {graphql} from 'react-apollo';
import React from 'react';
import {compose, withStateHandlers, branch, withHandlers, withState, withProps} from 'recompose';
import {Form} from 'antd';
import gql from 'graphql-tag';
import {withModal} from "../../../../../../../components/Modal/index";

const GET_PROFILE = gql`
query GET_USER_TEAM($user_id:UID) {
    patient(id: $user_id) {
       id
       motivation {
              careTeam {
                  totalCount,
                  edges{
                      id,
                      user {
                          ...UserInfo
                          phoneFormatted
                      }
                      joinedDate
                      roleText
                  }
              }
       }
    }
  }
`;
const mockData = [];
for (let i = 0; i < 20; i++) {
    mockData.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        disabled: i % 3 < 1,
    });
}
const targetKeys = mockData
    .filter(item => +item.key % 3 > 1)
    .map(item => item.key);
const withQuery = graphql(GET_PROFILE, {
    options: ({patient}) => {
        return {
            variables: {
                id: '',
            },
        }
    },
    props: ({data, ownProps}) => {
        const {patient} = ownProps;
        return {loading: data.loading, patient: patient}
    },
});

const enhance = compose(
    withQuery,
    withStateHandlers(
        ({
            mockData,
            targetKeys,
            selectedKeys: [],
        })
    ),
    withHandlers({
        onSubmit: props => () => {
            console.log(props, 'Props before input');
            // props.form.validateFields((err, values) => {
            //     console.log(err);
            //     console.log(values);
            // if (!err) {
            //     console.log(values);
            //     props.onHide();
            //     // props.onSubmit(values).then(({data})=> {
            //     //     props.onHide();
            //     // });
            // }
            // });
        },
        handleChange: (nextTargetKeys, direction, moveKeys) => {

            console.log('direction: ', direction);
            console.log('moveKeys: ', moveKeys);
            return {targetKeys: nextTargetKeys};


        },

        handleSelectChange: (sourceSelectedKeys, targetSelectedKeys) => {
            console.log('sourceSelectedKeys: ', sourceSelectedKeys);
            console.log('targetSelectedKeys: ', targetSelectedKeys);
            {
                selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys]
            }
            ;


        }

    }),
    withProps(props => {
        return {modalTitle: props.patient ? 'Edit User' : 'Add User'}
    }),
    withModal
);

export default enhance(TeamManager);