import React from 'react';
import { Form, Select, Spin} from 'antd';
const FormItem = Form.Item;

class RecipientAutoComplete extends React.Component{
    state = {fetching: false}


    handleSearch = (value) => {

        this.props.search(value);
        this.setState({
            //value,
            fetching: true,
        });
    };

    componentWillReceiveProps = (nextProps) => {
        if (!nextProps.loading) {
            this.setState({
                fetching: false,
            });
        }
    }

    render(){

        let {participants, label, formItemLayout} = this.props;
        const {fetching} = this.state;
        const {getFieldDecorator} = this.props.form;


        const options = participants.map(({user: {id, fullName}, isDND}) => <Select.Option key={id}>{fullName} {isDND && <div style={{fontSize:'0.8em',color:'grey'}}>DND</div>}</Select.Option>);

        return (
            <FormItem
                {...formItemLayout}
                label={label}
            >
                {getFieldDecorator('recipients',{
                        rules: [{required: true, type:'array',   message:"Select recipient" }],
                    }
                )(
                    <Select showSearch
                            allowClear
                            onSearch={this.handleSearch}
                            notFoundContent={fetching ? <Spin size="small" /> : 'Not users found'}
                            filterOption={(input, option) => {
                                return option.props.children[0].toLowerCase().indexOf(input.toLowerCase()) >= 0;
                            }}
                            mode="multiple"

                            placeholder="Select Recipient" placement="topRight" >{options}</Select>
                )}
            </FormItem>)
    }

}
export default RecipientAutoComplete;

