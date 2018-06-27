import React from 'react';
import { graphql } from 'react-apollo';
import DecisionElementOption from '../components/DecisionElementOption';
import {PLAN_ELEMENT_CHILDREN_QUERY} from "../../../../PlanLayout/components/PlanElement/containers/queries";

// 1- add queries:
const withQuery = graphql(
    PLAN_ELEMENT_CHILDREN_QUERY,
    {
        options: (ownProps) => ({
            variables: {
                id: ownProps.id,
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
                }

            } else {
                return {loading: data.loading}
            }
        },
    }
);


export default withQuery(DecisionElementOption);