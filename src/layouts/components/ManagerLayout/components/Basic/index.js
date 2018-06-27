import React from 'react'
import {NavLink, Switch} from 'react-router-dom';
import {Layout, Menu, Icon} from 'antd';
import {BasicRoutes} from '../../../../routes';
import {ManagerRoutes} from '../../routes';
import RightMenu from '../../../../components/Header/containers/RightMenu';
import PrivateRoute from '../../../../../routes/privateRoute';
import {asyncPlanbuilder} from '../../../../../routes/manager';
import Logo from './logo';
const {Sider, Header, Content, Footer} = Layout;
const SubMenu = Menu.SubMenu;

const BasicLayout = ({loading, user, store, location, match}) => {


    //console.log(location);
    //console.log(match);
    const {id, tab = 'build', subtab = 'header'} = match.params;

    const selectedItem = subtab || tab;
    const openItem = tab;


    let mainUrl = '/pb';
    if (id !== '') {
        mainUrl += '/'+id;
    }

    return (
        <Layout style={{minHeight: '100vh'}}>
            <PrivateRoute path="/pb" component={asyncPlanbuilder(store)}/>
            <Header style={{background: '#fff', padding: 0, zIndex:1}}>
                <div style={{
                    height: 64,
                    padding: '8px 12px 0 0',
                    background: '#fff',
                    position: 'relative',
                    boxShadow:' 0 1px 4px rgba(0,21,41,.08)'
                }}>

                    <div className="logo" style={{marginTop: '-8px', marginLeft:5, float:'left'}}>

                        <Logo /></div>
                    <RightMenu/>
                </div>
            </Header>
            <Layout>
                <Sider
                    collapsible
                    breakpoint="lg"
                >

                    <Menu theme="dark" defaultSelectedKeys={[selectedItem]} defaultOpenKeys={[openItem]} mode="inline">

                        <Menu.Item key="dashboard">
                            <NavLink to="/"> <Icon type="dashboard"/><span>Dashboard</span></NavLink>
                        </Menu.Item>

                        <SubMenu
                            key="staff"
                            title={<span><Icon type="user"/><span>Staff</span></span>}
                        >
                            <Menu.Item key="admins"><NavLink to="/admins">Network Managers</NavLink></Menu.Item>
                            <Menu.Item key="supervisors"><NavLink to="/supervisors">Supervisors</NavLink></Menu.Item>
                            <Menu.Item key="ncms"><NavLink to="/ncm">Care Managers</NavLink></Menu.Item>
                            <Menu.Item key="analysts"><NavLink to="/analysts">Analysts</NavLink></Menu.Item>
                            <Menu.Item key="employers"><NavLink to="/employers">Support Staff</NavLink></Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="patients"
                            title={<span><Icon type="team"/><span>Patients</span></span>}
                        >
                            <Menu.Item key="/patients/active"><NavLink to="/patients"> Active</NavLink></Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="providers"
                            title={<span><Icon type="share-alt"/><span>Providers</span></span>}
                        >
                            <Menu.Item key="providers"><NavLink to="/providers">Active</NavLink></Menu.Item>
                            <Menu.Item key="providers/analysis"><NavLink to="/providers/analysis">Analysis</NavLink></Menu.Item>
                            <Menu.Item key="providers/reports"><NavLink to="/providers/reports">Reports</NavLink></Menu.Item>
                            <SubMenu key="authorizations" title="Authorization">
                                <Menu.Item key="providers/authorization/all"><NavLink to="/providers/authorization/all">All</NavLink></Menu.Item>
                                <Menu.Item key="providers/authorization/new"><NavLink to="/providers/authorization/new">New</NavLink></Menu.Item>
                                <Menu.Item key="providers/authorization/approved"><NavLink to="/providers/authorization/approved">Approved</NavLink></Menu.Item>
                                <Menu.Item key="providers/authorization/declined"><NavLink to="/providers/authorization/declined">Declined</NavLink></Menu.Item>
                            </SubMenu>
                        </SubMenu>
                        <SubMenu
                            key="programs"
                            title={<span><Icon type="laptop"/><span>Programs</span></span>}
                        >
                            <Menu.Item key="programs/active">Active</Menu.Item>
                            <Menu.Item key="programs/archived">Archived</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="other"
                            title={<span><Icon type="appstore"/><span>Other</span></span>}
                        >
                            <Menu.Item key="workflow"><NavLink to="/workflow">Workflow</NavLink></Menu.Item>
                            <Menu.Item key="actionplans"><NavLink to="/actionplans">ActionPlans</NavLink></Menu.Item>
                            <Menu.Item key="pathways"><NavLink to="/pathways">Pathways</NavLink></Menu.Item>
                            <Menu.Item key="tumorboards"><NavLink to="/tumorboards">Tumor Boards</NavLink></Menu.Item>
                            <SubMenu key="manage" title="Manage">
                                <Menu.Item key="stages"><NavLink to="/stages">Stages</NavLink></Menu.Item>
                                <Menu.Item key="cancers"><NavLink to="/cancers">Cancers</NavLink></Menu.Item>
                                <Menu.Item key="chemotherapies"><NavLink to="/chemotherapies">Chemotherapies</NavLink></Menu.Item>
                                <Menu.Item key="payers"><NavLink to="/payers">Payers</NavLink></Menu.Item>
                                <Menu.Item key="doctors"><NavLink to="/doctors">Doctors</NavLink></Menu.Item>
                            </SubMenu>
                            <Menu.Item key="assessments"><NavLink to="/assessments">Assessments</NavLink></Menu.Item>
                            <Menu.Item key="checklists"><NavLink to="/checklists">Checklists</NavLink></Menu.Item>
                            <Menu.Item key="protocols"><NavLink to="/protocols">Protocols</NavLink></Menu.Item>
                            <SubMenu key="dme" title="DME">
                                <SubMenu key="dme/orders" title="Orders">
                                    <Menu.Item key="dme/orders/all"><NavLink to="/dme/orders/all">All</NavLink></Menu.Item>
                                    <Menu.Item key="dme/orders/new"><NavLink to="/dme/orders/new">New</NavLink></Menu.Item>
                                    <Menu.Item key="dme/orders/supplied"><NavLink to="/dme/orders/supplied">Supplied</NavLink></Menu.Item>
                                </SubMenu>
                                <Menu.Item key="dme/worklist"><NavLink to="/dme/worklist">Worklist</NavLink></Menu.Item>
                            </SubMenu>
                            <Menu.Item key="claims"><NavLink to="/claims">Claims</NavLink></Menu.Item>
                            <Menu.Item key="clinicaltrials"><NavLink to="/clinicaltrials">Clinical Trials</NavLink></Menu.Item>

                        </SubMenu>
                    </Menu>
                </Sider>


                <Content style={{minHeight: '100vh'}}>
                        <BasicRoutes store={store}/>
                        <ManagerRoutes store={store}/>
                    <Footer style={{textAlign: 'center', background: 'transparent'}}>
                        Copyright © 2010-2018 Fitango Inc. All rights reserved
                    </Footer>
                </Content>

            </Layout>
        </Layout>
    )
}

export default BasicLayout;
