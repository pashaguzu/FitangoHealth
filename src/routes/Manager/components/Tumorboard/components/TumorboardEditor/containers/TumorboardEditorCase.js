import TumorboardEditorCase from '../components/TumorboardEditorCase';
import {branch, renderComponent, compose, withHandlers, withState} from 'recompose';
import {Form, message} from 'antd';
import {arrayMove} from 'react-sortable-hoc';
import {withUpdateTumorboardCasesMutation} from "../../TumorboardCaseEditor/mutations";

const enhance = compose(
    withUpdateTumorboardCasesMutation,
    withState('cases', 'setCases', props => props.tumorboard.getCases || []),
    withHandlers({
        onSortEnd: props => ({oldIndex, newIndex}) => {
            const cases = arrayMove(props.cases, oldIndex, newIndex);
            props.setCases(cases);
            // const casesIds = props.cases.map(tumCase => {
            //     return tumCase.id;
            // });
            // props.updateOrder(casesIds).then(() => {
            //     message.success('Updated');
            // });
        },
        onCaseAdd: props => tumorCase => {
            // append a new case
            //console.log(tumorCase);
            const cases = [...props.cases, tumorCase];
            props.setCases(cases);
        },
        removeCase: props => id => {
            const cases = props.cases.filter(item => item.id !== id);
            props.setCases(cases);
        },
        goNext: props => () => {
            // save elements
            console.log(props.cases);

            const cases = props.cases.map((tumorCase, i) => {
                const {id, patient={},elements:caseElements} = tumorCase;
                const elements = caseElements.map((element, i) => {
                    const {id, timelineId, notes} = element;
                    return {id, timelineId, notes}
                });
                const {id:patientId} = patient;
                return {id, patientId, elements};
            });
            //return true;
            //const casesIds = props.cases.map(tumCase => {
                //     return tumCase.id;
                // });
                //const elements = caseElements.map((element, i) => {
                    //     const {id, timelineId, notes} = element;
                    //     return {id, timelineId, notes}
                    // });
            props.updateCases(cases).then(() => {
                message.success('Updated');
                props.goNext();
            });

        },
    })
);


export default enhance(TumorboardEditorCase);