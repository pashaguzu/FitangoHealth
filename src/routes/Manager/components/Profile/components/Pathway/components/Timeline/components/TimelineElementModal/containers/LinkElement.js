import {
    LinkElementBuilder,
    enhance
} from '../../../../../../../../../../Plan/components/PlanLayout/components/PlanElementBuilder/containers/LinkElementBuilder';
import {modalHOC} from '../modal';
import {compose, withProps, withHandlers} from 'recompose';

const enhanceProps = compose(
    withProps(props => {
        const {details} = props;
        return {
            details: {
                ...details,
                id: '',
            },
            showNotes:false
        }
    }),
    enhance,
    modalHOC
);

export default enhanceProps(LinkElementBuilder);