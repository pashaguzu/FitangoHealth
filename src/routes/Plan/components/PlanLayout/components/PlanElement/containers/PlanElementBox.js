import PlanElementBox from '../components/PlanElementBox';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {message} from 'antd';
import { compose, withProps, branch, withHandlers , defaultProps, withState} from 'recompose';


import Plan from '../../../../../../Plan/components/Plan';

/*
const GET_ELEMENT = gql`
    query GET_ELEMENT ($id: UID!, $date: Date) {
        PlanElement (id: $id, date:$date) {
        ...PlanElement
        }
    }
    ${Plan.fragments.element}
`;

// 1- add queries:
const PlanElementWithQuery = graphql(
    GET_ELEMENT,
    {
        options: (ownProps) => {

            return {
                variables: {
                    id: ownProps.element.id,
                    date: ownProps.date,
                },
                fetchPolicy: 'cache-only'
            }

        },
        props: ({ ownProps, data }) => {



            return data;

            if (!data.loading) {
                const plan = data.plan;
                const body = plan.body;
                const lessons = body.lessons || [];
                const activities = body.activities || [];
                const intro = body.intro || [];

                return {
                    //upid: data.plan.upid,
                    //modules: data.network.modules,
                    loading: data.loading,
                    lessons: lessons,
                    activities: activities,
                    intro: intro,

                    loadDate(date) {

                        return data.fetchMore({
                            // query: ... (you can specify a different query. FEED_QUERY is used by default)
                            variables: {
                                // We are able to figure out which offset to use because it matches
                                // the feed length, but we could also use state, or the previous
                                // variables to calculate this (see the cursor example below)
                                date: date,
                            },
                            updateQuery: (previousResult, {fetchMoreResult}) => {
                                //return {medicationPlan:{id:29}};

                                //fetchMoreResult.date = date;
                                if (!fetchMoreResult) { return previousResult; }
                                return fetchMoreResult;
                                return Object.assign({}, previousResult, {
                                    medicationPlan: fetchMoreResult.medicationPlan,
                                });
                            },
                        });
                    }
                }

            } else {
                return {loading: data.loading}
            }
        },
    }
)(PlanElement);*/

const reportOnField = gql`
    mutation planFieldReport($id: UID!, $date: Date!, $value: [String], $upid: UID!) {
        planElementReport(id:$id, upid: $upid, date: $date, value: $value) {
                ...PlanElement
        }
    }
    ${Plan.fragments.element}
`;




export const PlanElementWithMutation = graphql(reportOnField, {
    props: ({ mutate }) => ({
        makeReport: (upid, id, date, value) => {
            return mutate({
                variables: { upid:upid, id: id, date: date, value:value},
                update: (store, { data: { planElementReport } }) => {

                    /*store.writeFragment({
                        id: 'PlanBodyElement:'+id,
                        fragment: Plan.fragments.element,
                        data: {
                            reports: planElementReport.reports,
                        },
                    });*/

                    // find ins PlanBodyElement:178368. and replace reports date
                    /*// Read the data from our cache for this query.
                    const data = store.readQuery({
                        query: medication,
                        variables: {
                            id: id,
                            user_id: uid
                        }
                    });
                    if (id) {
                        // add new to the list
                    }


                    // Add our comment from the mutation to the end.
                    //data = medicationUpdate;
                    // Write our data back to the cache.
                    store.writeQuery({
                        query: medication,
                        data: {medication: medicationUpdate},
                        variables: {
                            id: id,
                            user_id: uid
                        }});*/
                },
            })
        },

    }),
});

const enhance = compose(
    PlanElementWithMutation,
    withHandlers({
        onChange: props => (value) => {
            if (props.isBuilderMode || props.isPreviewMode) {
                return;
            }
            const {upid, element, date} = props;
            if (!date) {
                return;// plug for now
            }
            //console.log(props,'Making a report');
            props.makeReport(upid, element.id, date, value).then(() => {
                message.success('Saved');
            });
        }
    })
);



export default enhance(PlanElementBox);
