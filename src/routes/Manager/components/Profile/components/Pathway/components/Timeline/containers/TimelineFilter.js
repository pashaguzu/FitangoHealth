import TimelineFilter from '../components/TimelineFilter';
import {message} from 'antd';
import {compose, withState, withHandlers, withProps} from 'recompose';
import {getTimelineElementsConst} from "../components/TimelineElementSelect/index";


const enhance = compose(
    withProps(props => {
        const {filters=[]} = props;
        const tags = getTimelineElementsConst(true);
        let selected = filters && filters.length > 0 ? filters : tags.map(tag => tag.type);
        return {
            tags:tags,
            selected
        }
    }),
    withState('filters', 'setFilters', props => props.filters),
    withState('selectedTags', 'setSelected', props => props.selected),
    withHandlers({
        handleChangeOld: (props) => (tag, checked) => {
            const {selectedTags} = props;
            if (!checked && selectedTags.length < 2) {
                message.error('At least one type should be selected');
                return false;
            }
            //console.log(tag);
            //console.log(checked);
            const nextSelectedTags = checked ?
                [...selectedTags, tag] :
                selectedTags.filter(t => t !== tag);
            //console.log('You are interested in: ', nextSelectedTags);
            //console.log(nextSelectedTags);
            props.setSelected(nextSelectedTags);
            props.loadFiltered(nextSelectedTags);
            props.updateFilters(nextSelectedTags);
        },
        handleChange: (props) => (nextSelectedTags) => {
            const {selectedTags, tags} = props;
            // if (!checked && selectedTags.length < 2) {
            //     message.error('At least one type should be selected');
            //     return false;
            // }
            //console.log(tags, 'tags');
            //console.log(nextSelectedTags);
            props.setSelected(nextSelectedTags);
            props.loadFiltered(nextSelectedTags);
            if (tags.length === nextSelectedTags.length) {
                props.loadFiltered([]);
            } else {
                props.updateFilters(nextSelectedTags);
            }

        },
        resetTags: props => () => {
            //console.log('reset');
            props.setSelected([]);
            props.updateFilters([]);
            props.loadFiltered([]);
        },
        selectAllTags: props => () => {
            //console.log(props, 'select');
            const tags = props.tags.map(tag => {
                return tag.type;
            });

            props.setSelected(tags);
            props.updateFilters(null);
            props.loadFiltered(null);
            //props.loadFiltered([]);
        },
    })
);
export default enhance(TimelineFilter);