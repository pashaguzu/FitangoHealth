import React from 'react'
import PropTypes from 'prop-types';
import Tracker from '../../../../../../Tracker';
//import Tracker from '../../../../../../../containers/Tracker';

export class TrackerField extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        const {report} = this.props;
        this.state = {
            isReported: false,
            value: (report && report.value) || null
        };
        this.handleChange = this.handleChange.bind(this);
        this.triggerChange = this.triggerChange.bind(this);
    };
    static propTypes = {
        id: PropTypes.number,
        date: PropTypes.string,
        info: PropTypes.object.isRequired,
        list_id: PropTypes.string,
        reportKey: PropTypes.number,
        column: PropTypes.number,
        report: PropTypes.object,
    };

    toggleReported = () => {

        if (this.state.isReported) {
            this.setState({isReported:false});
        } else {
            this.setState({isReported:true});
        }

    }

    componentWillReceiveProps = (nextProps) => {

        const {report} = nextProps;
        this.setState({
            value: (report && report.value) || null
        });

        if (!nextProps.loading) {
            /*this.setState({
                //value,
                fetching: false,
            });*/
        }
    }

    componentWillMount = () => {
        /*const {id, quantity, report} = this.props;
        const report_id = report.id || 0;
        if (report_id) {
            this.setState({isReported: true});
        }*/
    }

    handleChange = (value) => {
        clearTimeout(this.timer);

        this.setState({ value });

        this.timer = setTimeout(function () {this.triggerChange(value)}.bind(this), 500);


    }

    triggerChange(value) {
        //e.preventDefault();

        const { onChange, info, report, date, list_id, reportKey, column } = this.props;
        const {id} = info.measurement;
        let report_input = {id:(report && report.id ? report.id : 0), value:value, date:date, reportKey:reportKey, column:column};

        return onChange(id, report_input, list_id);
    }

    render() {

        const {info} = this.props;
        const report_value = this.state.value;

        return (<Tracker item={info.measurement} value={report_value} onChange={this.handleChange} />)
    }
}



export default TrackerField
