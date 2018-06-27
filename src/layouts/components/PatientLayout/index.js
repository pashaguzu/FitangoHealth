import React from 'react'
import {Layout} from 'antd';
import {Switch} from 'react-router-dom'
import LayoutHeader from '../../components/Header';
import {BasicRoutes} from '../../routes';
import {PatientRoutes} from './routes';

const {Header, Content, Footer} = Layout;

const PatientLayout = ({loading, token, store, location}) =>  {
    return (
        <div style={{height:'100%', display: 'flex',
            'minHeight': '100vh',
            'flexDirection':'column'}}>

            <Header style={{background:'#fff'}}>
                <LayoutHeader loading={loading} token={token} location={location}  />
            </Header>
            <Content style={{ padding: '20px 50px', flex: '1' }}>
                    <BasicRoutes store={store} />
                    <PatientRoutes store={store} />
            </Content>
            <Footer>
                Copyright © 2010-2018 Fitango Inc. All rights reserved
            </Footer>

        </div>
    )}

export default PatientLayout;
