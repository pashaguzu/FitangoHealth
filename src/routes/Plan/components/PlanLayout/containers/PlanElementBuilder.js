import { compose, withProps, mapProps, withHandlers , defaultProps, withState} from 'recompose';
import PlanElementBuilder from '../components/PlanElementBuilder';

const debug = withProps(console.log);
// add graphql HOC
const enhance = compose(
    debug,
    defaultProps({
        id:''
    }),
    mapProps(
        props => {
            let {parentId, parentValue} = props;
            const {planId, lessonId, sectionId, id, type, mode, onHide, order=null } = props;

            // if (element) {
            //     parentId = element.id;
            // }
            return {
                planId,
                lessonId,
                sectionId,
                id,
                type,
                isBuilderMode:true,
                mode,
                onHide,
                parentId,
                parentValue,
                order
            }
        }
    ),

    // toggle type of the element
    withState('id', 'setId', ({id}) => id),
    withState('loading', 'setLoading', false),

    withHandlers({
        onSubmit: props => event => {
            console.log(props, 'onsubmit');
        }
        // getTypeName: props => type => {
        //     /*const elementsByType = getProperElements();
        //     let title = '';
        //     elementsByType.forEach(info => {
        //         const elements = info[1];
        //         elements.forEach(({type:elType, label}) => {
        //             if (elType === type) {
        //                 title = label;
        //                 return false;
        //             }
        //         })
        //     })
        //     return title;*/
        // }
    }),


);

export default enhance(PlanElementBuilder);