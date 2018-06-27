/**
 * Created by Pavel on 10.01.2018.
 */
import React from 'react';
import DiscussionsForm from  './containers/discussions';
import ListCommunityForm from  './components/Communities';
import Plan from  './components/PlansList';
import News from  '../CategoryNews/components';
import CategoryTmp from './components/CategoryInfo';
 import Search from  './containers/Search.js';
import { Card,Popconfirm,Button,Row,Col  } from 'antd';
import { withApollo} from 'react-apollo'
import {withRouter} from "react-router-dom";
import '../../../../style.css';
import {
    injectIntl
} from 'react-intl';
import messages from './messages';

class Category extends React.Component{
    state = {
        key:'Overview',
        noTitleKey: 'Overview',
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.clickJoin = this.clickJoin.bind(this);
    }

    handleChange(value) {
        this.props.handleBreadcrumbChange(value);
    }
    clickJoin = () => {
        const { onSubmit, info} = this.props;
        return onSubmit(info.id);
    }

    clickUNJoin = () => {
        const { onClick,info} = this.props;
        return onClick(info.id);
    }

    componentDidMount() {
        // window.addEventListener('load',());
    }
    onTabChange = (key, type) => {
        this.setState({ [type]: key });
    }

    render(){
         const {info,loading} = this.props;

        if (loading) {
            return (
                <Card loading >Loading!!!</Card>
            );
        }
        const { intl } = this.props;
        const {name,canJoin,news, isJoined,articles,discussions,categories,plans} = info;
console.log("pasha---------------",news);
        let categoriesKV = [];
        categories.forEach((item)=>{
            categoriesKV.push({value:item.id, text:item.name});
        });



        const tabListNoTitle = [];
        let contentListNoTitle={};
        articles.forEach((item)=>{
            contentListNoTitle[item.title] = <div>
                <Col span={16}>
                    <h3>{item.title}</h3>
                    <div dangerouslySetInnerHTML={{__html: item.text}} />
                </Col>
                <Col offset={1} span={7}>
                    <img alt="" src={item.thumbs.large} />
                </Col>
                </div>
        })
        for(let i=0;i<articles.length;i++)
        {
            tabListNoTitle.push(
            {
                key: articles[i].title,
                tab: articles[i].title,
            }
            )
        }
        return(

            <div>
                  <CategoryTmp clickJoin={this.clickJoin} clickUNJoin={this.clickUNJoin} info={info}/>
                {categories.length > 0 && <ListCommunityForm name={name}  categories={categories} />}
                {news.totalCount > 0 && <News info={news}  />}
                <DiscussionsForm categoryId={info.id} name={name} discussions={discussions} canAdd={canJoin && isJoined} />
                {plans.length > 0 && <Plan  plans={plans}/>}
            </div>
        );
    }

}
export default withApollo(withRouter(injectIntl(Category)));
