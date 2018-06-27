/**
 * Created by Pavel on 10.01.2018.
 */
import React from 'react';
import { Card,List } from 'antd';
import { withApollo } from 'react-apollo'
import Search from  '../Category/containers/Search.js';
import {
    injectIntl
} from 'react-intl';
import messages from './messages';
import CategoryCard from '../CategoryCard';

class MainCategories extends React.Component{



    render(){
        const {info,loading} = this.props;

        if (loading) {
            return (
                <Card loading  title="Main Categories">Loading!!!</Card>
            );
        }
        const { intl } = this.props;
        let categoriesKV = [];
        info.forEach((item)=>{
            categoriesKV.push({value:item.id, text:item.name});
        });

        return(
                <Card
                    title={intl.formatMessage(messages.title)}
                    extra={ <Search categories={categoriesKV} />
                    }
                >
                    <List
                        split={false}
                        loading={loading}
                        grid={{gutter: 10, xs: 1, sm: 2, md: 3, lg: 4}}
                        dataSource={info}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <CategoryCard item={item} />
                            </List.Item>
                        )}
                    />

                </Card>
        )
    }

}

export default withApollo(injectIntl(MainCategories));
