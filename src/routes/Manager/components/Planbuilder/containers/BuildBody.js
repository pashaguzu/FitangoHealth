import BuildBody from '../components/BuildBody';
import {PlanElementPureFragment, PlanCardFragment} from "../../../../Plan/components/Plan/fragments";

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';



const PB_PLAN_BODY_QUERY = gql`
    query PB_PLAN_BODY ($id: UID!) {
        plan (id: $id) {
            ...PlanCardInfo,
            lessons {
                id
                title
                elements {
                    ...PlanElement,
                }
            }
            activities {
                id
                title
                elements {
                    ...PlanElement,
                }
            }            
            intro {
                 ...PlanElement,
            }

        }
    }
    ${PlanCardFragment}
    ${PlanElementPureFragment}
`;


// 1- add queries:
const BuildBodyWithQuery = graphql(
    PB_PLAN_BODY_QUERY,
    {
        options: (ownProps) => {
            //console.log(ownProps);
            return {
            variables: {
                id: ownProps.plan.id,
            }}
        },
        props: ({ ownProps, data }) => {
            console.log(ownProps);
            console.log(data);
            if (data.plan && !data.loading) {
                const plan = data.plan;
                //const body = plan.body;
                const lessons = plan.lessons || [];
                const activities = plan.activities || [];
                const intro = plan.intro || [];
                return {
                    //upid: data.plan.upid,
                    //modules: data.network.modules,
                    loading: data.loading,
                    planId: plan.id,
                    lessons: lessons,
                    activities: activities,
                    intro: intro,
                }

            } else {
                return {loading: data.loading, lessons:[], activities:[], intro:[]}
            }
        },
    }
)(BuildBody);

export default BuildBodyWithQuery;