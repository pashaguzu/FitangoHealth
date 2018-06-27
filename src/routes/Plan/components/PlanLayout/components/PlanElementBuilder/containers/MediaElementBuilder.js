import React from 'react';
import {Radio} from 'antd';
import {compose, withHandlers, branch, renderComponent, withState, withProps} from 'recompose';
import MediaElementBuilderPure, {prepareInput} from '../components/MediaElementBuilder';
import {modalHOC, withSpinnerWhileLoading} from "../modal";
import {getMediaTypeInfo} from "../components/MediaElementBuilder/index";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export const MediaElementBuilder = MediaElementBuilderPure;

export const enhance = compose(
    withSpinnerWhileLoading,
    withHandlers({
        onSubmit: props => callback => {
            console.log(props);
            if (1===1 || !props.id || props.form.isFieldsTouched()) {
                props.handleSave({prepareInput:prepareInput, callback:props.onHide} );
            } else {
                props.onHide();
            }
        },

    }),
);

const SelectMediaTypePure = ({onChange}) => <RadioGroup onChange={onChange}>
    <RadioButton value="image">Image</RadioButton>
    <RadioButton value="video">Video</RadioButton>
    <RadioButton value="audio">Audio</RadioButton>
    <RadioButton value="document">Document</RadioButton>
</RadioGroup>;
 const enhanceIfNoType = compose(
     withProps(props => {
         return {modalFooter:false};
     }),
     withHandlers({
         modalTitle: props => values => {
             return 'Select Media Type';
         },
         onChange: props => e => {
             props.setType(e.target.value);
         }
     }),
     modalHOC,
 );

    const SelectMediaType = enhanceIfNoType(SelectMediaTypePure);

const enhanceWithModal = compose(
    enhance,
    withState('typeMedia', 'setType', props => props.typeMedia),
    branch(props => !props.typeMedia, renderComponent(SelectMediaType)),
    withHandlers({
        modalTitle: props => values => {
            // get media type
            //console.log(props);
            const {typeMedia} = props;
            let {name} = getMediaTypeInfo(typeMedia);
            return props.id ? 'Edit '+name : 'Add '+name;
        },
    }),
    modalHOC,
);

export default enhanceWithModal(MediaElementBuilderPure);