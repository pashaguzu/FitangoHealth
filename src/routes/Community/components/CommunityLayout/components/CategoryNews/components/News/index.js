/**
 * Created by Pavel on 10.01.2018.
 */
import React from 'react';
import { Row,Col } from 'antd';

export const News = (props) => {

        const {news} = props;
        return(
            <div>
                <Row>
                    <Col span={5}><img src={news.thumb} /></Col>
                    <Col  span={19}>
                    <Row><h3>{news.title}</h3></Row>
                    <Row><div dangerouslySetInnerHTML={{__html: news.text}} /></Row>
                    </Col>
                </Row>

            </div>
        );
}
export default News;

