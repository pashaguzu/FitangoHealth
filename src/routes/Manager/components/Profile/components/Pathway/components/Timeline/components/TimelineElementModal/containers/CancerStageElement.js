import React from 'react';
import {withApollo} from 'react-apollo';
import {
    CancerStageElement,
    enhance
} from '../../../../../../../../../../Plan/components/Plan/components/CancerStage';
import {modalHOC} from '../modal';
import {withModal} from "../../../../../../../../../../../components/Modal/index";
import {compose, branch, renderComponent, withProps, withHandlers, withState} from 'recompose';
import {CancerStageSelect} from "../../../../../../../../../../../components/Autosuggest/containers/CancerStageSelect";
import {CANCER_STAGE_QUERY} from "../../../../../../../../Stages/containers/StageManager";

const selectStage = props => {
    return <CancerStageSelect onChange={props.selectStage} />
}



let queryOptions = {
    query: CANCER_STAGE_QUERY,
    fetchPolicy: 'cache-first'
}

const selectStageEnhanced = compose(
    withProps(props => {
        return {
            modalTitle: 'Select Stage',
            modalFooter:false
        }
    }),
    withApollo,
    withHandlers({
        selectStage: props => (value, option) => {
            queryOptions.variables = {
                id: value
            };
            props.client.query(queryOptions)
                .then(({data}) => {
                const {getCancerStage = {}} = data;
                    props.selectStage(getCancerStage);
                });

            //stage

        }
    }),
    withModal,
)(selectStage);
const enhanceProps = compose(
    withProps(props => {
        const {details, pathway={}} = props;
        const {cancer={}} = pathway;
        const {stage} = cancer;
        return {
            stageDetails:stage,
            details: {
                ...details,
                id: '',
            },
            showNotes:false
        }
    }),
    withState('stageDetails', 'setStageDetails', props => props.stageDetails || {}),
    enhance,
    withHandlers({
        modalTitle: props => values => {
            return 'Add Stage';
        },
        selectStage: props => (stage) => {
            //console.log(options);
            props.setStageDetails(stage);
        }
    }),
    branch(props => {
        const {stageDetails={}} = props;
        return Object.keys(stageDetails).length === 0
    }, renderComponent(selectStageEnhanced)),
    modalHOC
);

export default enhanceProps(CancerStageElement);