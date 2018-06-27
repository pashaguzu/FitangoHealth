/**
 * Created by Pavel on 10.01.2018.
 */
import React from 'react';
import {Card,Button ,Modal } from 'antd';
import {Redirect, Link } from 'react-router-dom';
import CategoryTmp from '../../../../routes/Community/components/CommunityLayout/components/Category/containers/CategoryInfo'
import CustomCascader from './components/Cascader';

  class CategorySelect extends React.Component {
      state={
          open:false,
          children:false
      }
      renameKeys =(obj, newKeys)=> {
              const keyValues = Object.keys(obj).map(key => {
                  const newKey = newKeys[key] || key;
                  return { [newKey]: obj[key] };
              });
              return Object.assign({isLeaf: false}, ...keyValues);

      }
      handleOk =(data)=> {
          this.setState({
              open: !this.state.open
          });
      }
      callback =(data)=> {
        //   console.log(data);
          this.setState({
              children: true,
              idChildren: data
          });
      }
    render() {
        const {items, loading} = this.props;

        if (loading) {
            return <div></div>
        }
        const newKeys = { name: "label", id: "value" };
        let renamedObj =[];
        items.forEach((item)=>{
            renamedObj.push(this.renameKeys(item, newKeys));
        })
        const {intl}=this.props;
        // const title = intl.messages.autosuggest_categoryselect_title;
         const title = "Medication Repository";
        return (
            <div>
                {!this.state.open &&
                <Modal
                    width={900}
                    title={title}
                    visible={true}
                    onCancel={this.props.onHide}
                    onOk={this.handleOk}
                    okText="OK"
                >
                    <center><CustomCascader callback={this.callback} items={renamedObj} renameKeys={this.renameKeys}/> </center><br/>
                    {this.state.children &&  <CategoryTmp id={this.state.idChildren} />}
                </Modal>
                }
            </div>
            );
        }
}
export default CategorySelect;
