import React from 'react';
import { Select} from 'antd';
const Option = Select.Option;

export default class PathwaySelect extends React.PureComponent {

    onSelect = (value) => {
        this.props.joinPathway(value).then(({data}) => {
            const {pathway} = data.joinPathway;
            this.props.onSelect(pathway);
        });
    }

    render() {
        const {loading, pathways=[]} = this.props;
        const placeholder = loading ? 'Loading Pathway...' : "Select Pathway";
        return (
            <Select placeholder={placeholder} onSelect={this.onSelect} style={{width:'100%'}}>
                {pathways.map(pathway => <Option key={pathway.id}>{pathway.title}</Option>)}
            </Select>);
    }
}