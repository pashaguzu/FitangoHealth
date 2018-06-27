import React from 'react';
import {Popover, Popconfirm, Icon} from 'antd';
import TrackerChartPopup from "../../../../../../components/Tracker/components/TrackerChartPopup";


const TrackerInfo = ({item, userId, date, deleteClick, editClick}) => {
    //console.log(item);
    const content = <div>
             <TrackerChartPopup item={item.item} userId={userId} date={date} label={item.label} /> <Icon onClick={(e)=> editClick(e, item)} type="edit" /> <Popconfirm title="Are you sure you want to delete this tracker?" onConfirm={(e)=> deleteClick(e, item)}  okText="Yes" cancelText="No"><Icon type="delete" /></Popconfirm>
    </div>;
    return <Popover content={content} trigger="hover">{item.name}</Popover>;
}

export default TrackerInfo;