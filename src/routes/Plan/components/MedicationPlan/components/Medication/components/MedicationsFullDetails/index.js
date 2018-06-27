import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col,Card, Spin,  Modal} from 'antd';
import MedicationChart from '../MedicationChart';
import AdverseReactions from "./containers/AdverseReactions";
import MedicationReminders from "../../components/MedicationReminders";



export default class MedicationsFullDetails extends React.Component {


    static propTypes = {
        userId: PropTypes.string,
        date: PropTypes.string,

    }

    static defaultProps = {
        date: '',
    }


    render() {

        const {loading} = this.props;
        if (loading) {
            return   <Modal
                visible={true}
                closable={false}
                destroyOnClose
                footer={false}
                bodyStyle={{height:150, textAlign:'center', lineHeight:5}}
            >
                <Spin tip="Loading..." />
            </Modal>
        }
        const {info, date, userId} = this.props;
        const {drug, summary} = info;


        const details = [
            {label:'Form', details:drug.dosage+' '+drug.form},
            {label:'Prescription', details: <span  dangerouslySetInnerHTML={{__html: info.prescription}}></span>},
            {label:'Period', details:   info.period},
            {label:'Prescribed', details: info.prescriber.fullName},
        ]
        if (info.directions !== '') {
            details.push({label:'Directions', details: info.directions});
        }
        if (info.purpose !== '') {
            details.push({label:'Purpose', details: info.purpose});
        }
        if (info.sideEffects !== '') {
            details.push({label:'Side Effects', details: info.sideEffects});
        }

        return (<Modal
            visible={true}
            destroyOnClose
            footer={false}
            title={drug.name}
            onCancel={this.props.onClose}
        >
            <Card title="Details" type="inner">
                {details.map((info) => <Row key={info.label} style={{marginBottom:10}}>
                    <Col md={6}>{info.label}</Col>
                    <Col md={18}>{info.details}</Col>
                </Row>)}
            </Card>
            <AdverseReactions userId={userId} item={info} />
            <Card title="This Week Summary" type="inner">
                <MedicationChart date={date} data={summary} userId={userId} width={430} useAxis={true} />
            </Card>
            <MedicationReminders item={info}  />
        </Modal>)
    }
}