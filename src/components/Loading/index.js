import React from 'react';
import {Card,Modal, Spin, Icon} from 'antd';

export class Loading extends React.PureComponent {
    render() {
        return (
            <Card bordered={false} loading>loading....</Card>
        );
    }
}

export default Loading;


export const Empty = ({text}) => {
   return <div className="ant-list-empty-text">{text}</div>
}

export const EmptyList = ({children}) => {
    return <div className="ant-list-empty-text">{children}</div>
}


export const SpinIndicator = () => <Icon type="loading" style={{ fontSize: 24 }} spin />;

export const LoadingModal = () => {
    return <Modal
        visible={true}
        closable={false}
        destroyOnClose
        footer={false}
        bodyStyle={{height: 160, textAlign: 'center', lineHeight: 8}}
    >
        <Spin indicator={<SpinIndicator />} />
    </Modal>
}


