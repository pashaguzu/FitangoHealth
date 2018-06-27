import React from 'react'
import PropTypes from 'prop-types';
import {Modal, Form} from 'antd';
import TreatmentBlockOptionSelect from '../TreatmentBlockOptionSelect';
import TreatmentBlockOptionManager from '../TreatmentBlockOptionManager';

class TreatmentBlockOptionAddModal extends React.Component {

    state = {
        optionType: '',
    }
    onSelect = (type) => {
        this.setState({optionType: type});
    }
    close = () => {
        this.setState({optionType: ''});
    }


    render() {

        const {id, onAdd, form, planId} = this.props;

        return (<Modal
            title={this.state.optionType === '' ? "Select Element" : 'Add Element'}
            visible={true}
            onCancel={this.props.onHide}
            footer={false}
        >
            {this.state.optionType !== '' &&
            <TreatmentBlockOptionManager planId={planId} id={id} form={form} type={this.state.optionType}
                                         onHide={this.close} onAdd={onAdd}/>
            }
            <TreatmentBlockOptionSelect onHide={this.props.onHide} onSelect={this.onSelect}/>
        </Modal>)
    }
}


const WrappedTreatmentBlockOptionAddModal = Form.create()(TreatmentBlockOptionAddModal);

export default WrappedTreatmentBlockOptionAddModal;