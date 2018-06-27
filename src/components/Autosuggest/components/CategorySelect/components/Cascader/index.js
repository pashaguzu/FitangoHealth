/**
 * Created by Pavel on 10.01.2018.
 */
import React from 'react';
import {Card, Cascader  } from 'antd';
import gql from "graphql-tag";
import { withApollo } from 'react-apollo'
class CustomCascader extends React.Component {
    state = {
        options:this.props.items
    };
    onChange = (value) => {
        if(value[2]){
            this.props.callback(value[2]);
        }
    }
    loadData = (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        this.props.client.query({
            query: gql`
                  query GET_CATEGORY($id:UID) {
                       category(id:$id) {
                         id
                        getChildrenCategories {
                          id
                          name
                        }
                        }
                }
`, fetchPolicy: 'network_only',
            variables: {
                id: targetOption.value
            }
        }).then((data)=>{
            targetOption.loading = false;

            const items = data.data.category.getChildrenCategories;
            const newKeys = { name: "label", id: "value" };
            let childrenObject =[];
            items.forEach((item,i)=>{
                childrenObject.push(this.props.renameKeys(item, newKeys));
            })
            targetOption.children = childrenObject;
            this.setState({
                options: [...this.state.options],
            });
        })
    }
    render() {
        return (
            <Cascader style={{width:300}} loadData={this.loadData} options={this.state.options} onChange={this.onChange} changeOnSelect placeholder="Please select"/>
        );
    }
}
export default  withApollo (CustomCascader);

