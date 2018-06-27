import React from 'react';
import { Modal, Form, message, Button} from 'antd';
import { compose, withHandlers, withState, withProps, branch, renderComponent} from 'recompose';
import Tracker from '../index';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};




const reportOnTracker = gql`
    mutation trackerReport($id: UID!, $input: TrackerReportInput!) {
        trackerReport(id:$id, input: $input) {
             id
        }
    }
`;


const withMutation = graphql(reportOnTracker, {
    props: ({ ownProps, mutate }) => ({
        trackerReport: (input) => {
            return mutate({
                variables: { input: input, id: ownProps.item.id },
            })
        },
    }),
});


const enhance = compose(
    withMutation,
    withHandlers({
        onChange: props => value => {


            clearTimeout(this.timer);

            this.timer = setTimeout(() => {
                //console.log(value);
                const report = {value, date:props.date}
                props.trackerReport(report).then(() => {
                    message.success('Saved');
                }).catch(e => {

                });
            }, 500);
        }
    })
);

const TrackerEnhanced = enhance(Tracker);


const TrackersReportModal = ({date='', trackers, onHide}) => {

    const modalTitle = trackers.length === 1 ? 'Report on '+(trackers[0].label) : 'Report on following trackers';
    return <Modal
        title={modalTitle}
        visible={true}
        onCancel={onHide}
        footer={[<Button type="primary" onClick={onHide}>Finish</Button>]}
    >
        {trackers.map((option, index) => {
            return (
                <FormItem
                    {...formItemLayout}
                    label={option.label}
                    required={true}
                    key={option.id}
                >
                    <TrackerEnhanced item={option} date={date} />

                </FormItem>
            )
        })}
        </Modal>;
};











export default TrackersReportModal;