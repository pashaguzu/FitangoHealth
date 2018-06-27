import React from 'react';
import {Card, List, Avatar} from 'antd';
import EllipsisText from 'react-ellipsis-text';
import {TimelineElementView} from "../../../Pathway/components/Timeline/components/TimelineElement/index";

const News = props => {
    const {items=[]} = props;

    return <Card title="Timeline" type="basic1">
        <List
            size="small"
            dataSource={items}
            renderItem={item => {
                const {body, color, activityText, image, icon, progress, title} = TimelineElementView(item);

                return <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar style={{ backgroundColor: color }}>{icon}</Avatar>}
                        title={title}
                    />
                </List.Item>
            }}
        />
    </Card>
}

export default News;