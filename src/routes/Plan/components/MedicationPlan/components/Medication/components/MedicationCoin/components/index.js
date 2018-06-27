import React from 'react'
import { Button, message, Tooltip } from 'antd';

export class MedicationCoin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
        };
    };
    static propTypes = {
    };

    toggleCoin = () => {

        if (this.state.isClicked) {
            //this.setState({isClicked:false});
            message.success('Medication Untaken');
        } else {
            //this.setState({isClicked:true});
            message.success('Medication Taken');
        }

    }

    /*componentWillMount = () => {
        const {report, date} = this.props;

        const {isTaken} = report;


        if (isTaken) {
            this.setState({isClicked: true});
        } else {
            this.setState({isClicked: false});
        }
    }
    /*componentWillReceiveProps = (nextProps) => {
        const {report} = this.props;

        const {id} = report;


        if (id) {
            this.setState({isClicked: true});
        } else {
            this.setState({isClicked: false});
        }
    }*/

    handleClick = (e) => {
        e.preventDefault();


        const { onClick,  med_id, report } = this.props;
        return onClick(med_id,  report, !report.isTaken, this.toggleCoin);

    }

    render() {

        const {report} = this.props;
        let {quantity} = this.props;
        const {isTaken} = report;

        // format quantity
        const qs = quantity % 1;//.split('.');
        let q = Math.floor(quantity);
        q = q > 0 ? q : '';

        //const qs = qInfo[1];
        switch (qs) {
            case 0.25:
                quantity = q+'&frac14';
                break;
            case 0.50:
                quantity = q+'&frac12';
                break;
            case 0.75:
                quantity = q+'&frac34';
                break;
            default:break;
        }
        //const hasReport = this.state.isClicked;

        if (isTaken) {
            return (<Tooltip title="Untake"><Button type="primary" size="large" shape="circle" onClick={this.handleClick} >
                <div  dangerouslySetInnerHTML={{__html: quantity}}></div>
            </Button></Tooltip>)
        }
        return (<Tooltip title="Take"><Button shape="circle" size="large" onClick={this.handleClick} >
            <div  dangerouslySetInnerHTML={{__html: quantity}}></div>
        </Button></Tooltip>)
    }
}



export default MedicationCoin
