import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import TimelineElement from '../components/TimelineElement';
import {FieldReportFragment} from "../../../../../../../../Plan/components/Plan/fragments";
import {TimelineElementFragment} from "../fragments";

const FIELD_REPORT_MUTATION = gql`
    mutation fieldReport($reportId: UID, $fieldId: UID!, $fieldType: String!, $value: [String], $userId: UID) {
        fieldReport(reportId:$reportId, fieldId: $fieldId, fieldType: $fieldType, value: $value, userId:$userId) {
            ...FieldReportInfo
        }
    }
    ${FieldReportFragment}
`;

export const GET_TIMELINE_ELEMENT_QUERY = gql`
 query GET_TIMELINE_ELEMENT($userId:UID, $id:UID!) {
   getTimelineElement (userId: $userId, id: $id ) {
         ...TimelineElement
         getReport {
            ...FieldReportInfo
         }
   }
}
    ${TimelineElementFragment}
    ${FieldReportFragment}
`;


const withMutation = graphql(FIELD_REPORT_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        handleReport: (value, fieldType) => {
            //console.log(ownProps, 'Treatment Props');
            const {item={}, userId} = ownProps;
            const {activity:{id:fieldId}, getReport={}} = item;
            const {id:reportId} = getReport || {};
            return mutate({
                variables: {reportId, fieldId, fieldType, value, userId},
                refetchQueries: [{
                    query: GET_TIMELINE_ELEMENT_QUERY,
                    variables: {id: item.id, userId},
                }],
                // update: (store, { data: { planElementReport } }) => {
                //
                //     /*store.writeFragment({
                //         id: 'PlanBodyElement:'+id,
                //         fragment: Plan.fragments.element,
                //         data: {
                //             reports: planElementReport.reports,
                //         },
                //     });*/
                //
                //     // find ins PlanBodyElement:178368. and replace reports date
                //     /*// Read the data from our cache for this query.
                //     const data = store.readQuery({
                //         query: medication,
                //         variables: {
                //             id: id,
                //             user_id: uid
                //         }
                //     });
                //     if (id) {
                //         // add new to the list
                //     }
                //
                //
                //     // Add our comment from the mutation to the end.
                //     //data = medicationUpdate;
                //     // Write our data back to the cache.
                //     store.writeQuery({
                //         query: medication,
                //         data: {medication: medicationUpdate},
                //         variables: {
                //             id: id,
                //             user_id: uid
                //         }});*/
                // },
            })
        },
    }),
});

export default withMutation(TimelineElement);