import {compose, branch, renderComponent} from 'recompose';
import TumorboardEditorHeader from './TumorboardEditorHeader';
import TumorboardEditorCase from './TumorboardEditorCase';
import TumorboardEditorPublish from './TumorboardEditorPublish';

const enhance = compose(
    branch(props => props.step === 1, renderComponent(TumorboardEditorCase)),
    branch(props => props.step === 2, renderComponent(TumorboardEditorPublish)),
    //branch(props => props.step === 3, renderComponent(TumorboardView))
)


export const TumorboardEditorBody = enhance(TumorboardEditorHeader);
