
import InviteEmail from '../components/InviteEmail';
import { graphql } from 'react-apollo';
import React from 'react';
import {compose,withStateHandlers, branch, withHandlers, withState, withProps} from 'recompose';
import {Form} from 'antd';
import gql from 'graphql-tag';
const enhance = compose(
    withState('visibleModal', 'setOpenManager', false),
        withHandlers({
            openModal: props => () => {
                props.setOpenManager(true);
            },
            hideModal: props => () => {
                props.setOpenManager(false);
            }
        })
);
export default enhance(InviteEmail);