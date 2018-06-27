import React from 'react';
import { compose, withHandlers, withState, withProps, branch, renderComponent} from 'recompose';
import OptionsElementBuilder, {prepareInput} from '../components/OptionsElementBuilder';
import {modalHOC, withSpinnerWhileLoading} from "../modal";
import {injectIntl} from 'react-intl';


const enhance = compose(
    withSpinnerWhileLoading,
    injectIntl,
    withState('element', 'setElement', props => {
        //console.log(props);
        const {element={}} = props;
        return element;
    }),
    withProps(props => {
        const {element={}, details={}} = props;
        const {itemInfo=details} = element;
        return {details:itemInfo};
        }
    ),
    withHandlers({
        saveElement: props => callback => {
            if (!props.id ||props.form.isFieldsTouched()) {
                props.handleSave({prepareInput:prepareInput, callback} );
            } else {
                callback()
            }
        }
    }),

    withHandlers({
        onSubmit: props => () => {
            props.saveElement(props.onHide);
        },
        modalTitle: props => () => {
            return props.id ? 'Edit Options' : 'Add Options';
        }
    }),
    modalHOC,
)
export default enhance(OptionsElementBuilder);