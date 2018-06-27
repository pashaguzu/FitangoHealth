import React from 'react'
import PropTypes from 'prop-types'

import {Card} from 'antd';



const LinkElement = props => {
    const {item} = props;
    return <Card hoverable bordered={false}><a href={item.url} target="_blank"><Card.Meta
        title={item.url}
        description={item.description}
    /></a></Card>;
}


export default LinkElement;
