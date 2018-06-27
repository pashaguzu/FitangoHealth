import React from 'react'
import { Select, Spin } from 'antd';
import PropTypes from 'prop-types';

export class TrackerSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            amid: 0,
            addModal: false,
            fetching: false,
        }

    };
    static propTypes = {
        userId: PropTypes.string,
        trackers: PropTypes.arrayOf(PropTypes.object),
        //onSelect: PropTypes.function
    };
    static defaultProps = {
        trackers: []
    };
    handleSearch = (value) => {

        this.setState({
            //value,
            fetching: true,
        });
        this.props.trackerSearch(value);
        // search for the medication
    };

    /*Get a list of all possible medications*/
    handleSelect = (value) => {
        // open add modal

        this.props.onSelect(value);

        //const {getListOfMedications } = this.props;
        //return getListOfMedications();
    };

    componentWillReceiveProps = (nextProps) => {
        if (!nextProps.loading) {
            this.setState({
                //value,
                fetching: false,
            });
        }
    }

    render() {
        const { fetching } = this.state;
        const options = this.props.trackers.map(d => <Select.Option key={d.id}>{d.label} <div style={{fontSize:'0.8em',color:'grey'}}>{d.units.name}</div></Select.Option>);
console.log(this.props.trackers,options);
        return (<Select showSearch
                        allowClear
                        optionFilterProp="name"
                        onSearch={this.handleSearch}
                        onSelect={this.handleSelect}
                        value={undefined}
                        notFoundContent={fetching ? <Spin size="small" /> : 'Not trackers found'}
                        filterOption={(input, option) => {
                           return option.props.children[0].toLowerCase().indexOf(input.toLowerCase()) >= 0;
                        }}

                        placeholder="Select Tracker" placement="topRight" style={{ width: 200 }}>{options}</Select>)
    }
}



export default TrackerSelect
