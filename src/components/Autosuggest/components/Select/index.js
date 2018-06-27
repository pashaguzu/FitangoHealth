import React from 'react'
import { Select as AntdSelect, Spin } from 'antd';
import PropTypes from 'prop-types';

const {Option} = AntdSelect;

 class Select extends React.Component {

    constructor(props) {
        super(props);
        const value = this.props.value || undefined;
        this.state = {
            fetching: false,
            value
        }
    };
    static propTypes = {
        userId: PropTypes.string,
        items: PropTypes.arrayOf(PropTypes.object),
        i18n: PropTypes.shape({
            placeholder: PropTypes.string,
            notFoundContent: PropTypes.string
        }),
    };
    static defaultProps = {
        items: [],
        i18n: {
            placeholder: 'Select',
            notFoundContent: 'Nothing found'
        }
    };
    handleSearch = (value) => {

        this.setState({
            //value,
            fetching: true,
        });
        this.props.doSearch(value);
    };

    handleSelect = (value) => {
        this.setState({
            value
        });
        if (this.props.onSelect) {
            this.props.onSelect(value);
        }
    };

    componentWillReceiveProps = (nextProps) => {
        if (!nextProps.loading) {

            if ('value' in nextProps) {
                const value = nextProps.value || undefined;
                this.setState({value});
            }
            this.setState({
                fetching: false,
            });
        }
    }

     onChange = (value, option) => {
            //console.log(option);
         if (!('value' in this.props)) {
             this.setState({ value });
         }
         this.triggerChange({ value });
     }

     triggerChange = (changedValue) => {
         // Should provide an event to pass value to Form.
         const onChange = this.props.onChange;
         if (onChange) {
             //console.log(Object.assign({}, this.state, changedValue.date));
             const value = changedValue.value;
             //const formattedDate = moment(date).format('YYYY-MM-DD');
             //console.log(this.state);
             //console.log(Object.assign({}, this.state, changedValue));
             onChange(value);
             //const newValue = Object.assign({}, this.state, changedValue);
             this.setState(changedValue);
             //onChange(Object.assign({}, this.state, changedValue));
         }
     }


     render() {
        const {i18n, items=[], loading=false, mode} = this.props;
        const { fetching, value } = this.state;
        const options = items.map(d => <Option key={d.id}>{d.title}</Option>);
        return (<AntdSelect showSearch
                            allowClear
                            optionFilterProp="name"
                            onSearch={this.handleSearch}
                            onSelect={this.handleSelect}
                            onChange={this.onChange}
                            value={loading ? undefined : value}
                            mode={mode}
                            notFoundContent={fetching ? <Spin size="small" /> : i18n.notFoundContent}
                            filterOption={(input, option) => {
                                return option.props.children[0].toLowerCase().indexOf(input.toLowerCase()) >= 0;
                            }}
                            placeholder={loading ? 'Loading...' : i18n.placeholder} placement="topRight" style={{ width: '100%' }}>{options}</AntdSelect>)
    }
}

export default Select;