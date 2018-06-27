import React from 'react';
import { Tooltip, Card } from 'antd';
import { Link } from 'react-router-dom'
import Truncate from 'react-truncate';
import './index.less';
const { Meta } = Card;


export default class CategoryCard extends React.PureComponent {
    render(){
        const {item} = this.props;

        return(
            <Link to={"/community/"+item.id}>
                <Card type="community"
                    cover={<img alt={item.name} style={{maxHeight:150}} src={item.thumb.large} />}
                >
                    <Meta title={<Tooltip title={item.name}><Truncate line={2}>{item.name}</Truncate></Tooltip>} />

                </Card>
            </Link>
        )
    }
}