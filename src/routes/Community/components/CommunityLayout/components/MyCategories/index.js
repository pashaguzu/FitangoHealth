/**
 * Created by Pavel on 11.01.2018.
 */
import React from 'react';
import {Form ,Card,List } from 'antd';
import { withApollo } from 'react-apollo'

import '../../../../style.css';
import CategoryCard from '../CategoryCard';


class MyCategories extends React.Component{




    render(){
        const {info,loading} = this.props;
        if (loading) {
            return (
                <Card loading title="My Categories">Loading!!!</Card>
            );
        }

        return(
            <Card
                title={"My Communities"+" ("+info.length+")"}
                type="static"
            >
                <List
                    split={false}
                    loading={loading}
                    grid={{gutter: 10, xs: 1, sm: 2,  lg: 4}}
                    dataSource={info}
                    renderItem={item => (
                        <List.Item key={item.category.id}>
                            <CategoryCard item={item.category} />
                        </List.Item>
                    )}
                />

            </Card>
        )
        /*return(
            <Card title="My Categories">
                <Carousel slidesToShow={6} arrows={true} centerPadding={20} slidesToScroll={6} responsive={[{ breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll:3 }}]}>

                        {CarouselItem}

                </Carousel>
            </Card>
        )*/
    }

}

const WrappedMyCategories = Form.create()(MyCategories);
export default withApollo(WrappedMyCategories);
