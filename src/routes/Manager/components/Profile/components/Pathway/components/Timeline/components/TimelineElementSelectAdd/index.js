import React from 'react';
import {Popover, Tooltip, Button} from 'antd';
import {compose, withState, withHandlers} from 'recompose';
import TimelineElementSelect from '../TimelineElementSelect';

const TimelineElementSelectAddPure = props => {
     console.log(props);
    const {onClick, show, handleVisibleChange, onSelect} = props;
     const content = (
         <div>
             <TimelineElementSelect onSelect={onSelect} />
         </div>
     );
    return <Popover
        visible={show}
        onVisibleChange={handleVisibleChange}
        content={content} placement="bottom" title="Select Element to Add"  trigger="click"><Tooltip title="Add Element"><Button icon="plus" size={'small'} shape="circle" onClick={onClick} /></Tooltip></Popover>;
}

const enhance = compose(
    withState('show', 'setShow', false),
    withHandlers({
        onClick:  (props) => (e) => {
            console.log(props);
            const { show, onClick } = props;

            props.setShow(!show);
           // onClick(e);
        },
        onClick:  (props) => (e) => {
            console.log(props);
            const { show, onClick } = props;

            props.setShow(!show);
            // onClick(e);
        },
        onSelect:  (props) => (e) => {
            props.setShow(false);
            props.onSelect(e);
        },
        handleVisibleChange:   (props) => (e) => {
            console.log(props);
            const {show} = props;
            props.setShow(!show);
            // onClick(e);
            // return {
            //     show: !show,
            // };
        },
    }),
    // withStateHandlers(
    //     ({ show = false }) => ({
    //         show: show,
    //     }),
    //     {
    //
    //         handleVisibleChange:   (props) => (e) => {
    //             console.log(props);
    //             // onClick(e);
    //             // return {
    //             //     show: !show,
    //             // };
    //         },
    //     }
    // )
);

export const TimelineElementSelectAdd = enhance(TimelineElementSelectAddPure);

export default TimelineElementSelectAdd;