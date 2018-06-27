import React from 'react';
import {Modal,Select, Button} from 'antd';
import {injectIntl} from 'react-intl';
import PlanElementChildrenList from "../../../../../../containers/PlanElementChildrenList";

const {Option} = Select;



const DecisionElementActionsPure = (props) => {
    console.log(props);
    const {id, details, planId, mode} = props;
    const {options=[]} = details;
    console.log(options);
    return (
        options.map((option, i) => <PlanElementChildrenList key={option.value} isBuilderMode elementId={id} planId={planId} mode={mode} elementValue={option.value} />)
    )
}

export default DecisionElementActionsPure;


//
// class DecisionElementActions extends React.Component {
//
//     state = {
//         optionId: ''
//     }
//
//     selectOption = (optionId) => {
//         console.log(this.props.form.getFieldsValue());
//         this.setState({optionId});
//     };
//
//     onHide = () => {
//         this.setState({optionId: ''});
//     }
//
//     addElement = (input) => {
//         console.log('input',input);
//         // save this value for the option
//         this.onClose();
//     }
//
//     onClose = () => {
//         //console.log(1111);
//         //console.log(this.props);
//         this.props.onClose();
//     }
//
//     render() {
//         const {mode, options=[], id='', planId} = this.props;
//         console.log(this.props, 'Actions');
//         return (
//             <React.Fragment
//                 // title={this.state.optionId ? 'Select Element': "Select Option for Action"}
//                 // visible={true}
//                 // destroyOnClose
//                 // footer={[
//                 //     <Button key="close" type="primary" onClick={this.onClose}>Close</Button>,
//                 //     ]}
//                 >
//
//                 {this.state.optionId ?
//
//                     :
//                     <Select placeholder="Select Option to add element" onChange={this.selectOption} style={{width:'100%'}}>
//                         {options.map((option, i) => <Option key={option.value}>{option.label}</Option>)}
//                     </Select>
//                 }
//             </React.Fragment>
//         );
//     }
// }
//
// export default injectIntl(DecisionElementActions);