import React from 'react'
import Select from '../Select';
import { compose, branch, renderComponent, withProps, withHandlers, defaultProps, mapProps} from 'recompose';

const TrackerSelect = ({loading, items=[], doSearch, onChange, value=undefined, getInfo=false}) => {
    const trackers = items.map(item => {
        return {id:item.id, title:item.label};
    })
    return <Select value={value} i18n={{placeholder:"Select Tracker"}} loading={loading} items={trackers} doSearch={doSearch} onChange={onChange} />;
};




const enhance = compose(
    defaultProps({
        selectInfo:undefined,// if to get the info
    }),
    withHandlers({
        onChange: props => trackerId => {
            if (props.selectInfo) {
                const tracker = props.items.filter(tracker => tracker.id === trackerId);
                if (tracker.length > 0) {
                    props.selectInfo(tracker[0]);
                }
            }
            props.onChange(trackerId);
        }
    })
)

export default enhance(TrackerSelect);