import React from 'react';
import {Form, Input, Button, Icon, Checkbox, List} from 'antd';
import { compose, withHandlers, withState, withProps} from 'recompose';
import {injectIntl} from 'react-intl';
import messages from './messages';
import TreatmentElementBlocks from './containers/TreatmentBlockOptions';
import TreatmentBlockManageOptionModal from './containers/TreatmentBlockManageOptionModal';
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19},
};
const formTailLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19, offset: 5},
};







export const prepareInput = (values) => {
    const {title} = values;
    let {elements=[]} = values;
    console.log(values);
    //console.log(elements);
    //  elements = elements.map(({option}) => {
    //      return option;
    //  });

    return {
        treatmentElement: {
            title,
            elements
        }
    }
}


const prepareElementForMutation = option => {
    let details = [];
    console.log(option, 'Prepare for mutation');
    const {id, notes, type} = option;
    switch (type) {
        case 'chemotherapy':
            // details = {
            //   builder
            // };
            const {element={}} = option;
            const {info={}} = element;
            const {chemotherapyElement=info} = option;
            const {chemotherapy={}} = chemotherapyElement;
            const {id:chemotherapyId} = chemotherapy;
            details = {id, notes, type, chemotherapyElement:{...chemotherapyElement, __typename: undefined, chemotherapy:undefined, id:undefined, chemotherapyId}};
            // const {cycles, days, notes, timesPerDay} = chemotherapyElement;
            break;
        default:
            details = {...option, element:undefined, __typename: undefined};
            break;
    }
    return details;
}


const TreatmentElementBuilder = (props) => {
    //console.log(props);
    const {openAddOption,planId, mode, form, intl, element={}, keys, elements=[]} = props;
    const {getFieldDecorator} = form;
    const {itemInfo={}} = element;
    const {title } = itemInfo;
    //console.log(elements);
    //const keys =  [];//getFieldValue('keys', {initialValue:[]});
    console.log(elements.map(option => prepareElementForMutation(option)));

    return (

        <React.Fragment>
            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.title)}
            >
                {getFieldDecorator('title', {
                        initialValue: title,
                        rules: [{required: true, message: "Enter Title", whitespace: true}],
                    }
                )(
                    <Input/>
                )}
            </FormItem>
            {elements.length > 0 &&
            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.treatments)}
                required={true}
            >
                {elements.length > 0 ?
                    form.getFieldDecorator(`elements`, {
                        initialValue: elements.map(option => prepareElementForMutation(option))
                    })
                    (<TreatmentElementBlocks elements={elements}  planId={planId} itemInfo={itemInfo} deleteTmpElement={props.deleteTmpElement} mode={mode} onElementUpdate={props.onElementUpdate} />)
                 : 'No treatment has been added'}

            </FormItem>}

            <FormItem {...formTailLayout}>
                <Button type="dashed" onClick={props.onAddOption} style={{width: '60%'}}>
                    <Icon type="plus"/> Add Treatment
                </Button>
            </FormItem>
            {openAddOption && <TreatmentBlockManageOptionModal planId={planId} treatmentId={itemInfo.id} mode={mode} onHide={props.onHideOption} onElementAdd={props.onElementAdd} />}

        </React.Fragment>
    );
}


const blankOption = {id:'', title:''};
const enhance = compose(
    injectIntl,
    withState('openAddOption', 'toggleAddOption', false),

    withState('uuid', 'setUUID', props => props.elements.length),
    withState('keys', 'setKeys',  props => {
        return Object.keys(props.elements);// save keys
    }),
    withHandlers({
        onAddOption: props => event => {
            props.toggleAddOption(true);
        },
        // hide options
        onHideOption: props => event => {
            props.toggleAddOption(false);
        },
        remove: props => k => {
            const {keys} = props;
            // can use data-binding to get
            //const keys = form.getFieldValue('keys');
            // We need at least one passenger
            if (keys.length <= 2) {
                return;
            }

            // remove option by key
            //options

            props.setKeys(keys.filter(key => key !== k));
            /*// can use data-binding to set
            form.setFieldsValue({
                keys: k,
            });*/
        }
    }),


    withHandlers({
        onElementUpdate: props => (key, element, callback) => {
            //console.log(key);
            //console.log(element);
            let elements = props.elements.map((el,i) => {
                if (i === key) {
                    return element;
                } else {
                    return el;
                }
            });
            console.log(props);
            console.log(elements);
            props.setElements(elements);
            callback();
        },
        onElementAdd: props => element => {
            const elements = props.elements;
            props.setElements([...elements, element]);
            props.onHideOption();
        },
        deleteTmpElement: props => option => {

            const elements = props.elements.filter((opt) => {
                // console.log(opt);
                // console.log(opt.type !== option.type );
                // console.log(opt.description !== option.description );
                // console.log(opt.type !== option.type && opt.description !== option.description);
                return (opt.type !== option.type || (opt.type === option.type && opt.description !== option.description));
            });

            props.setElements(elements);
        }
    })
);

export default enhance(TreatmentElementBuilder);