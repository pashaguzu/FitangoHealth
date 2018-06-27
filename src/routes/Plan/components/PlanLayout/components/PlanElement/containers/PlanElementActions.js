import PlanElementActions from '../components/PlanElementActions';
import { compose, branch, withState, defaultProps, withHandlers, renderComponent} from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {Modal, message} from 'antd';
import {PlanElementPureFragment} from "../../../../Plan/fragments";
import PlanElementChildrenSelect from '../../../../PlanLayout/components/PlanElement/components/PlanElementChildrenList/components/PlanElementChildrenSelect/index.js';


const deletePlanElement = gql`
    mutation deletePlanElement($id: UID!, $planId: UID!) {
        deletePlanElement(id:$id, planId: $planId)
    }
`;

const pathwayFragment =  gql`
   fragment PathwayElements on Pathway {
        id
        elements {
            ...PlanElement,
        }
   }
    ${PlanElementPureFragment}
 `;

const planElementChildrenFragment =  gql`
   fragment PlanBodyElements on PlanBodyElement {
        id
        childrenElements {
            id
        }
   }
    ${PlanElementPureFragment}
 `;



export const withMutation = graphql(deletePlanElement, {
    props: ({ ownProps, mutate }) => ({
        deleteElement: (id) => {
            return mutate({
                variables: { planId:ownProps.planId, id: id},
                update: (client, { data: { planElementReport } }) => {
                    const {mode, planId, parentId} = ownProps;
                    console.log(ownProps);
                    if (parentId) {
                        // update element
                        let pathway = client.readFragment({
                            id: 'PlanBodyElement:' + parentId, // `id` is any id that could be returned by `dataIdFromObject`.
                            fragment: planElementChildrenFragment,
                            fragmentName: "PlanBodyElements",
                        });

                        console.log(pathway);
                        // let {childrenElements:elements} = pathway;
                        // elements = elements.filter(element => element.id !== id);
                        // elements = elements.length > 0 ? elements : [];
                        //
                        // client.writeFragment({
                        //     id: 'PlanBodyElement:' + parentId, // `id` is any id that could be returned by `dataIdFromObject`.
                        //     fragment: planElementChildrenFragment,
                        //     fragmentName: "PlanBodyElements",
                        //     data: {
                        //         ...pathway,
                        //         childrenElements: elements,
                        //         __typename: 'PlanBodyElement'
                        //     },
                        // });

                    } else {
                        if (mode === 'pathway') {
                            // if it's pathway - remov
                            let pathway = client.readFragment({
                                id: 'Pathway:' + planId, // `id` is any id that could be returned by `dataIdFromObject`.
                                fragment: pathwayFragment,
                                fragmentName: "PathwayElements",
                            });

                            let {elements} = pathway;
                            elements = elements.filter(element => element.id !== id);
                            elements = elements.length > 0 ? elements : [];

                            client.writeFragment({
                                id: 'Pathway:' + planId, // `id` is any id that could be returned by `dataIdFromObject`.
                                fragment: pathwayFragment,
                                fragmentName: "PathwayElements",
                                data: {
                                    ...pathway,
                                    elements: elements,
                                    __typename: 'Pathway'
                                },
                            });
                        } else {

                        }
                    }
                },
            })
        },

    }),
});





const enhanceInner = compose(
    withMutation,
    withState('order', 'setOrder', null),
    withState('openEditElement', 'showEditElement', false),
    defaultProps({
        buttons:[]
    }),
    withHandlers({
        toggleEditElement: props => () => {
            props.showEditElement(!props.openEditElement);
            if (!props.openEditElement) {
                props.setOrder(null);
            }
            //props.setOrder(null);
        },
        deleteElement: props => () => {
            const {deleteElement, id} = props;
            Modal.confirm({
                title: 'Do you want to delete this element?',
                onOk() {
                    deleteElement(id).then(() => {
                        message.success('Deleted');
                    });
                },
            });
        },
        addAfterElement: props => () => {
            props.setOrder(props.i+1);
        },
        addFirstElement: props => () => {
            props.setOrder(0);
        },
        addBeforeElement: props => () => {
            let i = props.i;
            console.log(props.i);
            if (i > 0) {
                i--;
            }
            props.setOrder(i);
        },
        hideOrder: props => () => {
            props.setOrder(null);
        },
    })
);

const enhance = compose(
    //branch(props => props.element, renderComponent(PlanElementChildrenSelect)),
    enhanceInner
)


export default enhance(PlanElementActions);
