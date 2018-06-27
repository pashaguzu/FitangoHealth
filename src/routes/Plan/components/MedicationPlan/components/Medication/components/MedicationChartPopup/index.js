import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment';

import MedicationChart from "../../../Medication/containers/MedicationChart";
import {Popover, Icon, Tooltip} from "antd/lib/index";


export default class MedicationChartPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date:props.date
        };
        this.showDate = this.showDate.bind(this);
        this.onVisibleChange = this.onVisibleChange.bind(this);
    };
    static propTypes = {
        date: PropTypes.string
    };

    onVisibleChange(e) {

    }
    showDate = (type) => {
        var dateTime = new Date(this.state.date);
        let date = '';
        if (type === 'prev') {
            date = moment(dateTime).add(-1, 'weeks').format("YYYY-MM-DD");
        } else {
            date = moment(dateTime).add(1, 'weeks').format("YYYY-MM-DD");
        }
        this.setState({date:date});
    };

    render() {
        const {item, userId, label} = this.props;
        const {date} = this.state;

        return (<Popover content={<MedicationChart date={date} item={item} userId={userId} />} title={<div>{label} Summary <div style={{float:'right'}}><Tooltip title={'Previous'}><Icon type="left" onClick={() => this.showDate('prev')} style={{marginRight:10}} /></Tooltip> <Tooltip title={'Next'}><Icon type="right" onClick={() => this.showDate('next')} style={{marginRight:10}} /></Tooltip></div></div>} trigger='click'><Tooltip title="Summary"><Icon type="area-chart" /></Tooltip></Popover>)
    }
}