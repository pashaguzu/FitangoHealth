import React from 'react';
import {withModal, withSpinnerWhileLoading} from "../../../../../components/Modal/index";
import TumorboardCaseEditor from "../components/TumorboardCaseEditor";
import {compose, branch, withState, withProps, withHandlers, renderComponent} from 'recompose';
import {withTumorboardQuery} from "../queries";
import {PatientSelect} from "../../../../../components/Autosuggest/containers/PatientSelect";
import {withCreateTumorboardCaseMutation} from "../components/TumorboardCaseEditor/mutations";

const PatientSelectModal = compose(
    withProps(props=> {
        return {
            modalTitle: 'Select Patient',
            modalFooter:false,
            getFullInfo:true
        }
    }),
    withModal,
    withHandlers({
        onChange: props => value => {
            console.log(value);
            props.setUser(value);
        }
    })
)(PatientSelect);

const enhance = compose(
    withState('user','setUser'),
    withState('caseElements', 'setCaseElements', []),
    branch(props => !props.user, renderComponent(PatientSelectModal)),
    withProps(props=> {
        const {user={}} = props;
        const {fullName=''} = user;
        //console.log();
        return {
            modalTitle: props.tumorboard ? 'Edit Tumor Board Case' : 'New Tumor Board Case from '+fullName,
            modalWidth: 800
        }
    }),
    withCreateTumorboardCaseMutation,
    withHandlers({
       onSubmit: props => () => {
           const {caseElements=[]} = props;

           console.log(caseElements);
           // const elements = caseElements.map((element, i) => {
           //     const {id, timelineId, notes} = element;
           //     return {id, timelineId, notes}
           // });

           // props.createTumorboardCase(elements).then(() => {
           //     props.onHide();
           // });
           // now just save in memory
           const tumorCase = {id:'', patient:props.user, elements:caseElements};
           props.onFinish(tumorCase);
           props.onHide();
       }
    }),
    branch(props => props.modal, withModal),
    withSpinnerWhileLoading,
    withHandlers({
        goNext: props => () => {
            console.log(props.step);
            props.setStep(props.step+1);
        },
        goPrev: props => () => {
            if (props.step > 0) {
                props.setStep(props.step - 1);
            }
        }
    }),
)


export default enhance(TumorboardCaseEditor);