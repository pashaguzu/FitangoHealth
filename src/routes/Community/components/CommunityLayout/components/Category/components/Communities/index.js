import React from 'react';
import {Card,List} from 'antd';
import { withApollo } from 'react-apollo'
import {
    injectIntl
} from 'react-intl';
import messages from './listCommunity.json';
import CategoryCard from '../../../CategoryCard';
class ListCommunity extends React.Component{



    render(){
        const {loading} = this.props;
        if (loading) {
            return (
                <Card loading  title="Main Categories">Loading!!!</Card>
            );
        }
        const { intl } = this.props;
        const {name,categories} = this.props;


        return(
            <Card
                title={name.toUpperCase()+intl.formatMessage(messages.communities)}
            >
                    <List
                        split={false}
                        loading={loading}
                        grid={{gutter: 16, xs: 1, sm: 2, md: 3, lg: 5, xl: 5}}
                        dataSource={categories}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <CategoryCard item={item} />
                            </List.Item>
                        )}
                    />
            </Card>
        );
    }
}
export default withApollo(injectIntl(ListCommunity));
