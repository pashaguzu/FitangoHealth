import React from 'react'
import Select from '../Select';
import { compose, branch, renderComponent, withProps, withHandlers, defaultProps, mapProps} from 'recompose';

const TrackerUnitsSelect = ({loading, items=[], doSearch, onChange, value=undefined}) => {
    let units = items.map(item => {
        return {...item, title:item.name};
    });
    return <Select value={value} i18n={{placeholder:"Select Units"}} loading={loading} items={units} /*doSearch={doSearch}*/ onChange={onChange} />;
};




const enhance = compose(
    defaultProps({
        selectInfo:undefined,// if to get the info
    }),
    withHandlers({
        onChange: props => itemId => {
            if (props.selectInfo) {
                const tracker = props.items.filter(tracker => tracker.id === itemId);
                if (tracker.length > 0) {
                    props.selectInfo(tracker[0]);
                }
            }
            props.onChange(itemId);
        }
    })
)

export default enhance(TrackerUnitsSelect);