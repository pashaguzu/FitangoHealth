/**
 * Created by Павел on 12.02.2018.
 */
import React from 'react';
import {Button ,Spin,Select,Modal } from 'antd';
import {LoadingModal} from 'components/Loading';
import ModalMakeCommitmentsFor from '../../containers/ModalMakeCommitmentsFor';
import SelectPlans from '../../../../../../../Plan/containers/SelectPlans';
import {
    injectIntl
} from 'react-intl';
import ru from './i18n/ru';
import en from './i18n/en';
const {Option} = Select;
class ModalMakeCommitments extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible:true,
            title:null
        };
    }
    handleCancel = () => {
        this.setState({ visible: true});
    }
    onChange = (e) => {
        this.setState({ title: e});
        this.setState({ visible: false});

    }
    render() {
        const  {info,loading} = this.props;
        if (loading) {
            return <LoadingModal /> ;
        }
        const {intl}=this.props;

        let selectItem =[];
        info.forEach(item=>{
            selectItem.push(  <Option key={item.id} value={item.plan.title}>{item.plan.title}</Option>)
        })
        return  (
            <div>
        {this.state.visible &&
            <Modal
                title={intl.messages.user_motivation_makecommitment}
                visible={true}
                onCancel={this.props.handleCancel}
                footer={[
                    <Button type="primary"  key="back" onClick={this.props.handleCancel}>{intl.messages.user_motivation_Commitments_cancel}</Button>
                ]}
            >

                <p>{intl.messages.user_ModalCommitments_motivation_text}</p>
                <center>
                    <SelectPlans onChange={this.onChange}/>
                </center>
            </Modal>}
                {!this.state.visible &&  <ModalMakeCommitmentsFor motivators={this.props.motivators} title={this.state.title} cancelParent={this.props.handleCancel} handleCancel={this.handleCancel} />}
                </div>
        );
    }
}
export default injectIntl(ModalMakeCommitments);