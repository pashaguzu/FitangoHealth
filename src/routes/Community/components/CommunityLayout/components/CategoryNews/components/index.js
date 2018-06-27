/**
 * Created by Pavel on 10.01.2018.
 */
import React from 'react';
import { Card,List } from 'antd';
import News from './News';

export const CategoryNewWrapper = (props) => {

            const {info, loading} = props;
            if (loading) {
                return (
                    <Card loading>Loading!!!</Card>
                );
            }
            const {totalCount, edges} = info;
            const title = "Health News";
            const count = totalCount > 0 ? " (" + totalCount + ")" : "";
            return (
                <Card title={title + count}>
                    <List
                        loading={loading}
                        itemLayout="vertical"
                        dataSource={edges}
                        renderItem={item => (
                            <List.Item key={item.id}
                            >
                                <News news={item}/>
                            </List.Item>

                        )}
                    />
                </Card>
            );
    }

export default CategoryNewWrapper;
