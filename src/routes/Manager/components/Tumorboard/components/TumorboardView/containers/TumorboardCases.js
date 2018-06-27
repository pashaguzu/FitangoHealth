import TumorboardCases from '../components/TumorboardCases';
import {withTumorboardQuery} from "../../../queries";
import {compose, withState, withHandlers} from 'recompose';


const enhance = compose(
    // //withTumorboardQuery,
    // withState('cases', 'setCases', props => props.tumorboard.getCases || [])
    // withHandlers({
    //     onSortEnd: props => ({oldIndex, newIndex}) => {
    //
    //         const cases = arrayMove(props.cases, oldIndex, newIndex);
    //         props.setCases(cases);
    //     }
    // })
);
export default enhance(TumorboardCases);