import React from 'react';
import {Modal} from 'antd';
import PlanElementSchedule from '../PlanElement/components/PlanElementManager/components/PlanElementSchedule';
import PlanElementAdditions from './components/PlanElementAdditions';
import {compose, withProps, branch, renderComponent, withState} from 'recompose';
import {withModal} from "../../../../../../components/Modal/index";


const formItemLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19},
};
const formTailLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19, offset: 5},
};

const enhance = compose(

    withProps(props => {

        let modalTitle = 'Modal2';//type === '' ? 'Select Element' : this.props.getTypeName(type);
        if (props.modalTitle) {
            modalTitle = props.modalTitle();
        }
        const modalOpts = {modalTitle:modalTitle};
        if (props.modalFooter) {
            modalOpts.footer = props.modalFooter();
        }
        return {
            ...modalOpts
        }
    }),
    withModal
);

const modalHOCPure = (WrappedComponent) => {
    class ModalWrappeer extends React.Component {

        onOk = () => {
            //console.log(this.props);
            //const prepareInput = this.props.prepareInput;


            this.props.onSubmit();
            /*this.props.setId(100);
           // this.props.setLoading(true);
            setTimeout(() => {
                this.props.setLoading(false);
            },2000);*/
            //const callback = this.props.onHide;
            //this.props.onSubmit({prepareInput, callback});
        }

        onCancel = () => {
            //console.log('onCancel');
            if (this.props.onHide) {
                this.props.onHide();
            } else {
                // just hide this modal
                console.log('modal invisible');
                this.props.setModalVisible(false);
            }
        }
        render() {
            console.log(this.props);
            //console.log(this.state);
            const {loading=false, type=''} = this.props;
            //let {id, details} = this.props;


            // Wraps the input component in a container, without mutating it. Good!
            return (

                        <React.Fragment>
                            <WrappedComponent {...this.props} formItemLayout={formItemLayout} />

                            <PlanElementSchedule {...this.props} formItemLayout={formItemLayout} />
                            {/*<PlanElementAdditions {...this.props} formItemLayout={formItemLayout} />*/}
                        </React.Fragment>
            )
        }
    }

    //treatmentModal.displayName = `treatmentModal(${getDisplayName(WrappedComponent)})`;


    return ModalWrappeer;
}

export const modalHOC = compose(modalHOCPure, enhance);



const Spinner = () =>
    <div className="Spinner">
        <div className="loader">Loading... as spinner</div>
    </div>;
const isLoading = ({ loading }) => loading;
export const withSpinnerWhileLoading = branch(
    isLoading,
    renderComponent(Spinner)
);