import React from 'react';
import { Tag, Icon, Popover, Tooltip, Modal, Card, Button, Checkbox, Select, notification } from 'antd';
import {compose, withHandlers, withState} from 'recompose';
const CheckableTag = Tag.CheckableTag;

const CheckboxGroup = Checkbox.Group;

const TimelineFilter = props => {
    const {selectedTags, handleChange, resetTags, selectAllTags, tags} = props;
    console.log(selectedTags);

    const plainOptions = tags.map(tag => {
        return {label:tag.name, value:tag.type};
    })
    const content = <CheckboxGroup options={plainOptions} className="checkbox-vertical" value={selectedTags} onChange={handleChange} />
    tags.map(tag => (
        <CheckableTag
            key={tag.type}
            checked={selectedTags.indexOf(tag.type) > -1}
            onChange={checked => handleChange(tag.type, checked)}
        >
            {tag.name}
        </CheckableTag>
    ));

    const allChecked = selectedTags && selectedTags.length === tags.length;
    const indeterminate = !allChecked && selectedTags && selectedTags.length > 0;
    return (<React.Fragment>


        {/*<Select defaultValue={selectedTags} onChange={handleChange} allowClear  mode="multiple" style={{width:'100%', marginBottom:5}}>*/}
            {/*{plainOptions.map((plainOption, i) => <Select.Option key={plainOption.value}>{plainOption.label}</Select.Option>)}*/}
        {/*</Select>*/}
       <Modal title="Events" width={300} onCancel={props.onHide} visible={true} footer={false/*<Button type="primary" onClick={props.onHide}>Close</Button>*/} >
           <Card type='pure' bordered={false} /*title="Type" extra={<React.Fragment>{selectedTags && selectedTags.length === 0 ? <Tooltip title="Select all" ><Icon type="reload" onClick={selectAllTags} /></Tooltip> : <Tooltip title="Clear All" ><Icon type="poweroff" onClick={resetTags} /></Tooltip>}</React.Fragment>}*/>
               <div style={{ borderBottom: '1px solid #E9E9E9', paddingBottom:5, marginBottom:5 }}>
                   <Checkbox
                   indeterminate={indeterminate}
                   onChange={(allChecked ? resetTags : selectAllTags)}
                   checked={allChecked}
               >
                   Select all
               </Checkbox>
               </div>
               {content}
           </Card>
        </Modal>
    </React.Fragment>);
}

const enhance = compose(
    withState('show', 'setShow', false),
    withHandlers({
        toggleFilter: props => () => {
            props.setShow(!props.show);
        },
        handleChange: props => (e) => {
            console.log(e);
            props.handleChange(e);
        },
        onHide: props => () => {
            // check number of filters
            const  {selectedTags} = props;
            if (selectedTags.length === 0) {
                // show an error
                notification.warning({
                    message: 'No Events Selected',
                    description: 'You need to select at least one event',
                    duration: 2,
                })
                return false;
            }
            props.toggleFilter();
        }
    })
)

export default enhance(TimelineFilter);