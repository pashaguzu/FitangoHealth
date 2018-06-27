import React from 'react';
import {withApollo} from 'react-apollo';
import { compose, withHandlers, withState, withProps, branch, renderComponen, lifecycle} from 'recompose';
import AliasElementBuilder, {prepareInput} from '../components/AliasElementBuilder';
import {Form} from 'antd';
import {modalHOC, withSpinnerWhileLoading} from "../modal";
import {PathwayBodyWithQuery} from "../components/AliasElementBuilder/containers/queries";
import {PLAN_ELEMENT_CHILDREN_QUERY} from "../../PlanElement/containers/queries";
import {getLabelFromElement} from '../utils';

let queryOptions = {
    query: PLAN_ELEMENT_CHILDREN_QUERY,
    fetchPolicy: 'network_only'
}

const checkIfLeaf = (type) => {
    return type !== 'condition' && type !== 'decision';;
}


const enhance = compose(
    PathwayBodyWithQuery,
    // withHandlers({
    //     prepareInput: props => values => {
    //         return prepareInput(values);
    //     },
    // }),
    withApollo,


    withProps(props => {
        const elements = props.elements;
        //console.log(props);
        const {element={}} = props;
        const {itemInfo={}} = element;
        const {elementRoute=[]} = itemInfo;
        let options = elements.map(element => {

            const isLeaf = checkIfLeaf(element.type);
            const label = getLabelFromElement(element);
            return {
                key: element.id,
                value: element.id,
                label: label,
                type: element.type,
                isLeaf: isLeaf,
            }

            // const haveMatch = elementRoute.filter(elementId => {
            //     elementId === element.id;
            // });

            //return option;
        });
        // elementRoute.map(elementId => {
        //     options = options.map(option => {
        //
        //     });
        //     return null;
        // });

        return {options}
    }),
    withState('options', 'setOptions', props => props.options),
    withHandlers({
        saveElement: props => callback => {

            props.handleSave({prepareInput, callback} );

            // props.form.validateFields((err, values) => {
            //     //console.log(err);
            //     //console.log(values);
            //     //return false;
            //     //console.log(props.form.isFieldsTouched());
            //     //console.log(props.form.isFieldsTouched());
            //     console.log(props);
            //     if (!err) {
            //
            //         //if (props.form.isFieldsTouched()) {
            //             const callbackSave = (element) => {
            //                 //console.log(element);
            //                 // save the new info
            //                 //props.setElement(element);
            //                 callback();
            //             }
            //             const valuesPrepared = props.prepareInput(values);
            //             //console.log(valuesPrepared);
            //             props.handleSave({input:valuesPrepared, callback:callbackSave} );
            //         //}
            //     }
            // });
        },
        onChange: props => value => {
            console.log(value);
        },

    }),

    withApollo,

    withHandlers({
        onSubmit: props => event => {
            props.saveElement(props.onHide);
        },
        loadData: props => selectedOptions => {
            const targetOption = selectedOptions[selectedOptions.length - 1];
            targetOption.loading = true;

            // load options lazily

            queryOptions.variables = {
                planId:props.planId,
                id: targetOption.value
            };

            props.client.query(queryOptions)
                .then(({data: {loading, planElement: {childrenElements=[]}}}) => {

                    console.log(childrenElements);
                    if (!loading) {
                        targetOption.loading = false;
                        if (childrenElements.length > 0) {

                            const children = childrenElements.map(element => {
                                const isLeaf = checkIfLeaf(element.type);
                                return {
                                    key: element.id,
                                    value: element.id,
                                    label: getLabelFromElement(element),
                                    type: element.type,
                                    isLeaf: isLeaf,
                                }
                            })

                            targetOption.children = children;
                            console.log([...props.options, props.options]);
                            props.setOptions([...props.options, props.options]);
                        } else {
                            targetOption.isLeaf= checkIfLeaf(targetOption.type);
                        }
                    }

                })
            setTimeout(() => {


            }, 1000);
            // load elements
            //console.log(selectedOptions);
        },

        modalTitle: props => values => {
            return props.id ? 'Edit Go To' : 'Add Go To';
        },
    }),
    lifecycle({
        componentDidMount() {
            //console.log(this.props);
            let {options, element={}} = this.props;
            const {itemInfo={}} = element;
            //console.log(element);
            //console.log(itemInfo);
            const {elementRoute=[]} = itemInfo;
            //console.log(elementRoute);
            let level = 0;
              options.map(option => {

                if (!option.isLeaf) {
                    //
                    const elementId = elementRoute[level] || false;
                    if (elementId === option.value) {
                        // if we have such route
                        this.props.loadData([option]);
                    }

                }

                return option;
            });

           // this.props.setOptions(options);
        }
    }),
    modalHOC,
)
export default Form.create()(enhance(AliasElementBuilder));