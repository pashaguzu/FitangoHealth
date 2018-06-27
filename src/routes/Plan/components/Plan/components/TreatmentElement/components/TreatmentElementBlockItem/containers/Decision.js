import React from 'react';
import { compose, branch, renderComponent, withHandlers , withState, defaultProps} from 'recompose';
import Decision from '../components/Decision/block.js';

// Final enhancement
const enhance = compose(
    withState('value', 'setValue', ''),
    withState('showChildren', 'toggleChildren', ''),
    withHandlers({
        onChange: props => value => {
            props.setValue(value);
            props.toggleChildren(value);
        }
    })
);


export default enhance(Decision);