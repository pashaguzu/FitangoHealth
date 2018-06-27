import {
    ClinicalNoteElementBuilder,
    enhance
} from '../../../../../../../../../../Plan/components/PlanLayout/components/PlanElementBuilder/containers/ClinicalNoteElementBuilder';
import {modalHOC} from '../modal';
import {compose, withProps} from 'recompose';

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
)

export default enhanceProps(ClinicalNoteElementBuilder);