import React from 'react';
import {Modal} from 'antd';


import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {PlanElementPureFragment} from "../../../../../../../../../../../../../Plan/fragments";


export const AddPathwayElementMutation = gql`
    mutation addPathwayElement($planId: UID!, $type:PlanElementEnum!, $input:PlanBodyElementInput!) {
        addPathwayElement(planId: $planId, type:$type, input: $input) {
            ...PlanElement
        }
    }
    ${PlanElementPureFragment}
`;
export const withAddPathwayMutation = graphql(AddPathwayElementMutation, {
    props: ({ ownProps, mutate }) => ({
        addPathwayElement: (input) => {
            return mutate({
                variables: {planId:ownProps.planId, type:ownProps.type, input:input},
            })
        },
    }),
});



function treatmentModalHOC(WrappedComponent) {


     class treatmentModal extends React.Component {
         state = {
             details: null
         }
         static defaultProps = {
             details:{},
         }
        componentWillReceiveProps(nextProps) {
            console.log('Current props: ', this.props);
            console.log('Next props: ', nextProps);
        }


        onOk = () => {
           console.log(this.props);
            this.props.form.validateFields((err, values) => {
                //console.log(this.elementExists());
                console.log(values);
                //lessonId
                const {title} = values;

                if (!err) {
                    if (this.props.id === '') {
                        this.props.addPathwayElement({textElement: {text: title}}).then(({data}) => {
                            this.setState({details: data.addPathwayElement});
                        });
                    } else {
                        console.log('edit');
                    }
                    //this.props.onAdd({type, title});
                }
            });
        }

        onCancel = () => {
            this.props.onHide();
        }
        render() {
            console.log(this.props);
            console.log(this.state);
            const {loading} = this.props;
            let {id, details} = this.props;

            if (!loading) {
                if (id === '' && this.state.details) {
                    // try to get info from
                    details = this.state.details;
                    id = details.id;
                }
            }
            // Wraps the input component in a container, without mutating it. Good!
            return (
            <Modal
                visible={true}
                onOk={this.onOk}
                onCancel={this.onCancel}
            >
                {loading ? 'Loading...' :
                    <WrappedComponent {...this.props} id={id} details={details} />
                }
            </Modal>);
        }
    }

    treatmentModal.displayName = `treatmentModal(${getDisplayName(WrappedComponent)})`;

    return withAddPathwayMutation(treatmentModal);
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default treatmentModalHOC;