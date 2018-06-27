/**
 * Created by Pavel on 10.01.2018.
 */
import React from 'react';
import DiscussionsForm from '../../containers/discussions';
import ListCommunityForm from '../../components/Communities';
import Plan from '../../components/PlansList';
import News from '../../../CategoryNews/components';
import Search from '../../containers/Search.js';
import {Card, Popconfirm, Button, Row, Col} from 'antd';
import {withApollo} from 'react-apollo'
import {withRouter} from "react-router-dom";
//import '../../../../style.css';
import {
    injectIntl
} from 'react-intl';
import messages from '../../messages';

class Category extends React.Component {
    state = {
        key: 'Overview',
        noTitleKey: 'Overview',
    }

    constructor(props) {
        super(props);
    }

    clickJoin = () => {
        const {onSubmit, info} = this.props;
        return onSubmit(info.id);
    }

    clickUNJoin = () => {
        const {onClick, info} = this.props;
        return onClick(info.id);
    }


    onTabChange = (key, type) => {
        this.setState({[type]: key});
    }

    render() {
        //console.log(this.props);
        const {info, loading} = this.props;

        if (loading) {
            return (
                <Card loading>Loading!!!</Card>
            );
        }
        const {intl} = this.props;
        console.log(info);
        const {name, canJoin, news, isJoined, articles, categories, discussions, plans} = info;


        let categoriesKV = [];
        categories.forEach((item) => {
            categoriesKV.push({value: item.id, text: item.name});
        });

        const tabListNoTitle = [];
        let contentListNoTitle = {};
        articles.forEach((item) => {
            contentListNoTitle[item.title] = <div>
                <Col span={16}>
                    <h3>{item.title}</h3>
                    <div dangerouslySetInnerHTML={{__html: item.text}}/>
                </Col>
                <Col offset={1} span={7}>
                    <img alt="" src={item.thumbs.small}/>
                </Col>
            </div>
        })
        for (let i = 0; i < articles.length; i++) {
            tabListNoTitle.push(
                {
                    key: articles[i].title,
                    tab: articles[i].title,
                }
            )
        }
        return (
            <Card title={name}
                  extra={<Row style={{width: 300}}>
                      <Col span={7}>
                          {canJoin ? isJoined ?
                              <Popconfirm title={intl.formatMessage(messages.popTitle)} onConfirm={this.clickUNJoin}
                                          okText={intl.formatMessage(messages.okText)}
                                          cancelText={intl.formatMessage(messages.cancelText)}>
                                  <Button type="danger"
                                          onClick={this.props.clickUNJoin}>{intl.formatMessage(messages.leave)}</Button></Popconfirm> :
                              <Button onClick={this.props.clickJoin}
                                      type="primary">{intl.formatMessage(messages.join)}</Button> : ''}</Col>
                      <Col offset={1} span={16}>
                          <Search categories={categoriesKV}/>
                      </Col>
                  </Row>
                  }

                  tabList={tabListNoTitle}
                  onTabChange={(key) => {
                      this.onTabChange(key, 'noTitleKey');
                  }}
            >
                {
                    articles.length !== 0 && contentListNoTitle[this.state.noTitleKey]
                }
            </Card>
        );
    }

}

export default withApollo(withRouter(injectIntl(Category)));
