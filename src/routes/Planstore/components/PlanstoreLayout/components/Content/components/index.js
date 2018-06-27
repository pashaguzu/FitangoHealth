import React from 'react';
import {Input, Col, List, Card, Spin, Icon} from 'antd';
import {
    FormattedMessage
} from 'react-intl';

import PlanWidget from '../../../../../../Plan/components/Plan';
import InfiniteScroll from 'react-infinite-scroller';
import './index.less';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;


export class PlanstoreLayout extends React.Component {

    state = {
        loading: false,
        //hasMore: true,
    }

    changePage = (page) => {
        this.props.loadMoreEntries(page)
    }

    search = (value) => {
        this.props.updateSearchStore(value);
    }

    stopLoading = () => {
        this.setState({
            loading: false,
        });
    }

    handleInfiniteOnLoad = (page) => {
        //let data = this.state.data;
        this.setState({
            loading: true,
        });

        this.props.loadMore(page+1, this.props.endCursor, this.stopLoading);
    }

    render() {
        const planPlaceholder = [];
        for (var i = 0; i < 6; i++) {
            planPlaceholder.push({
                item: <Card loading>aaa
                </Card>
            })
        }


        const {loading, plans, search, hasMore} = this.props;

        if (loading) {
            return (
                <Col>
                    <div style={{marginBottom: 24}}>
                        <Card title={<FormattedMessage id="planstore.content.header" defaultMessage="ActionPlans"
                                                       description="Action plan"/>}>
                            <Input.Search
                                onKeyUp={this.search}
                                defaultValue={search}
                                size="large"
                            />
                        </Card>
                    </div>

                    <List
                        grid={{gutter: 20, xs: 1, sm: 1, md: 2, lg: 3, xl: 4}}
                        dataSource={planPlaceholder}

                        renderItem={item => (
                            <List.Item>
                                {item.item}
                            </List.Item>
                        )}
                    />
                </Col>
            )
        }
        const pageOpts = {
            onChange: this.changePage,
            total: this.total,
            hideOnSinglePage: true/*, showSizeChanger:true*/
        };
        //const hasMore = true;
        const searchText = 'Search for ActionPlan';//<FormattedMessage id="planstore.search" defaultMessage="Search for ActionPlan" description="Action plan search" />;
        return (

            <div>
                <div style={{marginBottom: 12}}>
                    <Card title={<FormattedMessage id="planstore.content.header" defaultMessage="ActionPlans"
                                                   description="Action plan"/>}>
                        <Input.Search
                            placeholder={searchText}
                            onSearch={this.search}
                            defaultValue={search}
                            size="large"
                        />
                    </Card>
                </div>

                {plans.length > 0 ?
                    <div className="demo-infinite-container1">
                        <InfiniteScroll
                            initialLoad={false}
                            pageStart={0}
                            loadMore={this.handleInfiniteOnLoad}
                            hasMore={!this.state.loading && hasMore}

                        >
                            <List
                                split={false}

                                loading={loading}
                                grid={{gutter: 16, xs: 1, sm: 1, md: 2, lg: 3, xl: 4}}
                                pagination={pageOpts}
                                dataSource={plans}
                                renderItem={product => (
                                    <List.Item key={product.id}>
                                        <PlanWidget info={product} key={product.id}/>
                                    </List.Item>
                                )}
                            />
                            {(this.state.loading && hasMore) && <Spin indicator={antIcon} className="demo-loading" />}
                        </InfiniteScroll>
                    </div> : <Card style={{textAlign: 'center'}}>No ActionPlans Found</Card>}
            </div>
        )
    }
}

export default PlanstoreLayout