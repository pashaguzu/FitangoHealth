import React from 'react';
import { TextRow, RectShape} from 'react-placeholder/lib/placeholders';
import {Layout,Card,Col,Row} from 'antd';

import PlanstoreSider from './components/Sider/containers'
import PlanstoreContent from './components/Content/containers'


const { Content, Sider } = Layout;




export class PlanstoreLayout extends React.Component {


    render() {
        const planPlaceholder = [];
        for(var i=0; i<8; i++) {
            planPlaceholder.push(  {
                item:   <div style={{width: 200, height: 100 }} className='my-awesome-placeholder'>
                    <RectShape color='#E0E0E0'  style={{width: 200, height: 100}}/>
                    <RectShape color='white'  style={{width: 200, height: 50}}/>
                </div>
            })
        }

        const siderPlaceholder = [];
        for(var j=0; j<4; j++) {
            siderPlaceholder.push(  {
                item:   <div  className='my-awesome-placeholder'>
                <RectShape color='#888888'  style={{width: 199, height: 20}}/>
        <TextRow color='#E0E0E0' style={{width: 170, height: 15}}/>
        <TextRow color='#E0E0E0' style={{width: 170, height: 15}}/>
        <TextRow color='#E0E0E0' style={{width: 170, height: 15}}/>
        <TextRow color='#E0E0E0' style={{width: 170, height: 15}}/>
        </div>
            })
        }

        const {loading} = this.props;

        if (loading) {
            return (<Layout style={{padding: '24px 0'}}>
                <Sider width={200} style={{background: 'transparent'}} breakpoint="xs"
                       collapsedWidth="0">
                    <Card loading>Loading</Card>
                    <Card loading>Loading</Card>
                </Sider>
                <Content style={{padding: '0 24px', minHeight: 280}}><Card loading>Loading</Card></Content>
            </Layout>);
        }

        return (
            <Row gutter={20}>
              <Col md={6}   xl={4}>
                  <PlanstoreSider loading={loading}  />
              </Col>
              <Col  md={18}  xl={20}>
                  <PlanstoreContent loading={loading} />
              </Col>
            </Row>
           )
        }
}

export default PlanstoreLayout