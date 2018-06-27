import React from 'react';
import {Modal,Select} from 'antd';
import {injectIntl} from 'react-intl';
import PlanElementChildrenList from "../../../../../../containers/PlanElementChildrenList";

const {Option} = Select;

class OptionElementCaseEditor extends React.Component {

    state = {
        optionId: ''
    }

    selectOption = (optionId) => {
        this.setState({optionId});
    };

    render() {
        const {mode, options=[], id='', planId, onHide} = this.props;
        //console.log(this.props);
        return (
            <Modal
                title="Children elements"
                visible={true}
                onCancel={onHide}
                width={600}
                footer={false}
            >

                {this.state.optionId ?
                    <PlanElementChildrenList isBuilderMode elementId={id} planId={planId} mode={mode} caseValue={this.state.optionId} />
                    :
                    <Select placeholder="Select Option to add element" onChange={this.selectOption} style={{width:'100%'}}>
                        {options.map(option => <Option key={option.value}>{option.label}</Option>)}
                    </Select>
                }
            </Modal>
        );
    }
}

export default injectIntl(OptionElementCaseEditor);