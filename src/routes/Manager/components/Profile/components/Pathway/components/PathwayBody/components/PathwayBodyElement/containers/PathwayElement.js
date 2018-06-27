import { compose, withProps, mapProps, withHandlers , defaultProps, withState} from 'recompose';
import PlanElement from "../../../../../../../../../../Plan/components/PlanLayout/components/PlanElement";


const enhance = compose(
    withHandlers({
        makeReport: props => () => {
            console.log(props);
        }
    })
);

export default enhance(PlanElement);