import React from 'react';
import { graphql } from 'react-apollo';
import { compose, withHandlers,  withState, mapProps} from 'recompose';

import ConditionElementOption from '../components/ConditionElementOption';
import {PLAN_ELEMENT_CHILDREN_QUERY} from "../../../../PlanElement/containers/queries";

// 1- add queries:
const withQuery = graphql(
    PLAN_ELEMENT_CHILDREN_QUERY,
    {
        options: (ownProps) => ({
            variables: {
                id: ownProps.element.id,
                planId: ownProps.planId,
                elementValue: ownProps.option.value
            },
            //fetchPolicy: 'network_only'
        }),
        props: ({  data }) => {
            if (!data.loading) {
                const planElement = data.planElement;
                const {childrenElements=[]} = planElement;

                return {
                    loading: data.loading,
                    elements: childrenElements,

                    loadDate(date) {

                        return data.fetchMore({
                            variables: {
                                date: date,
                            },
                            updateQuery: (previousResult, {fetchMoreResult}) => {
                                if (!fetchMoreResult) { return previousResult; }
                                return fetchMoreResult;
                            },
                        });
                    }
                }

            } else {
                return {loading: data.loading}
            }
        },
    }
);



const enhance = compose(
    withQuery,
    withState('openAddOption', 'toggleAddOption', false),
    withHandlers({
        // add options
        onAddOption: props => event => {
            props.toggleAddOption(true);
        },
        // hide options
        onHideOption: props => event => {
            console.log(1111);
            props.toggleAddOption(false);
        },
    }),
);

export default enhance(ConditionElementOption);


