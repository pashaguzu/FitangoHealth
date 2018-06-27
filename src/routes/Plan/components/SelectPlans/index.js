/**
 * Created by Павел on 12.02.2018.
 */
import React from 'react';
import {Select } from 'antd';
const {Option} = Select;
class SelectPlans extends React.Component {
    render() {
        const  {info,loading} = this.props;
        if (loading) {
            return  <p>Loading</p>;
        }

        let selectItem =[];
        info.forEach(item=>{
            selectItem.push(  <Option key={item.id} value={item.plan.title}>{item.plan.title}</Option>)
        })

        return  (
                        <Select style={{ width: 470 }} onChange={this.props.onChange}>
                            {selectItem}
                        </Select>

        );
    }
}
export default SelectPlans;