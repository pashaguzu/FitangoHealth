import PlanstorPlanLayout from '../components/PlanstorePlanLayout'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Plan from '../../Plan/components/Plan';

const PLANSTORE_PLAN = gql`
    query GET_PLANSTORE_PLAN ($id: UID!) {
        plan (id: $id) {
            ...PlanCardInfo,
            description,
            benefits,
            start_date,
            end_date,
            gender,
            elements,
            language,
            alreadyDownloadedId,
            isFixedDated
            categories {
                id,
                name
            },

        }
    }
    ${Plan.fragments.plan}
`;


// 1- add queries:
const withQuery = graphql(
    PLANSTORE_PLAN,
    {
        options: (ownProps) => ({
            variables: {
                id: ownProps.match.params.id
            }
        }),
        props: ({data }) => {
            if (!data.loading) {
                return {
                    plan: data.plan,
                    alreadyDownloaded: data.plan.alreadyDownloadedId !== '',
                    alreadyDownloadedId: data.plan.alreadyDownloadedId,
                    loading: data.loading,
                }

            } else {
                return {loading: data.loading}
            }
        },
    }
);


export default withQuery(PlanstorPlanLayout);