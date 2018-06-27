import React from 'react';
import { compose, withHandlers, withState} from 'recompose';
import CalculatorElementBuilderPure, {prepareInput} from '../components/CalculatorElementBuilder';
import {Form, Button} from 'antd';
import {modalHOC, withSpinnerWhileLoading} from "../modal";
import {ElementTrackerFragment} from "../../../../Plan/fragments";

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';



// add query of trackers
export const GET_POSSIBLE_SCALES_QUERY = gql`
    query GET_POSSIBLE_PLAN_TRACKERS  ($pid: UID) {
        plan(id: $pid) {
            id
            getTrackers {
                ...TrackerElement
            }
        }
    }
    ${ElementTrackerFragment}
`;

const CalculatorElementBuilderWithQuery = graphql(
    GET_POSSIBLE_SCALES_QUERY,
    {
        options: (ownProps) => ({
            variables: {
                pid: ownProps.planId,
            }
        }),
        props: ({data}) => {
            if (!data.loading) {

                return {
                    trackers: data.plan.getTrackers,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
)(CalculatorElementBuilderPure);

export const CalculatorElementBuilder = CalculatorElementBuilderWithQuery;

export const enhance = compose(
    withState('showTest', 'openTest', false),
    withHandlers({
        onSubmit: props => callback => {
            if (!props.id || props.form.isFieldsTouched()) {
                props.handleSave({prepareInput, callback:props.onHide} );
            } else {
                props.onHide();
            }
        },
        onTest: props => value => {
            props.openTest(true);
        },
        onHideTest: props => value => {
            props.openTest(false);
        },
    }),
)


const enhanceWithModal = compose(
    enhance,
    withHandlers({
        modalTitle: props => values => {
            return props.id ? 'Edit Calculator' : 'Add Calculator';
        },
        modalFooter: props => values => {
            return [
                <Button key="cancel" onClick={props.onCancel}>Cancel</Button>,
                <Button key="test" type="primary" ghost onClick={props.onTest}>Test</Button>,
                <Button key="next" type="primary" onClick={props.onSubmit}>Save</Button>
            ]

        },
    }),
    modalHOC,
)

export default enhanceWithModal(CalculatorElementBuilderWithQuery);