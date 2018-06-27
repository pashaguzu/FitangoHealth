import React from 'react'
import Select from '../Select';

const PlanSelect = ({loading, items, doSearch, onChange, value=undefined}) => {
    return <Select value={value} i18n={{placeholder:"Select ActionPlan"}} loading={loading} items={items} doSearch={doSearch} onChange={onChange} />;
};

//class Select extends React.Component {

export default PlanSelect;


//
// export default class PlanSelect extends React.Component {
//
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             fetching: false,
//         }
//     };
//     static propTypes = {
//         userId: PropTypes.string,
//         items: PropTypes.arrayOf(PropTypes.object),
//     };
//     static defaultProps = {
//         items: []
//     };
//     handleSearch = (value) => {
//
//         this.setState({
//             //value,
//             fetching: true,
//         });
//         this.props.doSearch(value);
//     };
//
//     handleSelect = (value) => {
//         this.props.onSelect(value);
//     };
//
//     componentWillReceiveProps = (nextProps) => {
//         if (!nextProps.loading) {
//             this.setState({
//                 fetching: false,
//             });
//         }
//     }
//
//     render() {
//         const { fetching } = this.state;
//         const options = this.props.items.map(d => <Select.Option key={d.id}>{d.title}</Select.Option>);
//
//         return (<Select showSearch
//                         allowClear
//                         optionFilterProp="name"
//                         onSearch={this.handleSearch}
//                         onSelect={this.handleSelect}
//                         value={undefined}
//                         notFoundContent={fetching ? <Spin size="small" /> : 'No ActionPlans found'}
//                         filterOption={(input, option) => {
//                            return option.props.children[0].toLowerCase().indexOf(input.toLowerCase()) >= 0;
//                         }}
//
//                         placeholder="Select ActionPlan" placement="topRight" style={{ width: '100%' }}>{options}</Select>)
//     }
// }