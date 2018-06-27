import React from 'react'
import {NavLink, Prompt, Route, Switch} from 'react-router-dom';
import {Layout, Menu, Steps, Icon} from 'antd';
import PlanbuilderContent from './components/PlanbuilderContent';
import LoadingPage from "../../../../components/LoadingPage/index";
const {Sider, Footer, Header, Content} = Layout;
const SubMenu = Menu.SubMenu;


const PlanbuilderLayout = (props) => {

    const {match, location, plan={}, loading} = props;
    //console.log(loading);
    if (loading) {
       // return <LoadingPage/>;
    }
    let {type} = props;
    //console.log(match);
    const {id, tab = 'build', type:typefromUrl = 'ap'} = match.params;
    let {subtab = ''} = match.params;
    if (tab === 'build' && subtab === '') {
        subtab = 'header';
    }

    const selectedItem = subtab || tab;
    const openItem = tab;
    //console.log(plan);
    type = plan && plan.id ? type : typefromUrl;


    let mainUrl = '/pb';
    if (id !== '') {
        mainUrl += '/'+id;
    }

    let menuItems = [];
    let exitURL = '/';
    let builderTitle = <React.Fragment><span style={{'fontWeight': 'bold'}}>PlanBuilder</span>{String.fromCharCode( "8482" )}</React.Fragment>;
    let children = [
        {label: 'Header', key: 'header'},
    ];

    switch(type) {
        case 'ap':
            exitURL = '/actionplans';

            if (plan.id) {
                children = [
                    {label: 'Header', key: 'header'},
                    {label: 'Body', key: 'body'},
                    {label: 'Options', key: 'options'}
                ];
            }
            menuItems.push({
                label: <React.Fragment><Icon type="layout" /> <span>Build</span></React.Fragment>, key: 'build', children:children
            });
        break;
        case 'pathway':
            exitURL = '/pathways';

            if (plan.id) {
                children = [
                    {label: 'Header', key: 'header'},
                    {label: 'Body', key: 'body'},
                ];
            }

            menuItems.push({
                label: <React.Fragment><Icon type="layout" /> <span>Build</span></React.Fragment>, key: 'build', children: children
            });
            builderTitle = <React.Fragment><span style={{'fontWeight': 'bold'}}>PathwayBuilder</span>{String.fromCharCode( "8482" )}</React.Fragment>;
            break;
    }

    if (plan.id) {
        menuItems.push({
                label: <React.Fragment><Icon type="info-circle-o"/><span>Preview</span></React.Fragment>, key: 'preview'
            }
        );
        menuItems.push({
                label: <React.Fragment><Icon type="check-circle-o"/> <span>Publish</span></React.Fragment>, key: 'publish'
            }
        );
    }

    //console.log(openItem);
    //console.log(selectedItem);

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider

                collapsible
                breakpoint="lg"
            >
                <div className="logo" style={{padding: '19px 10px', color:'#51ade2',  'fontSize': '1.2em', background: '#fff'}}>
                    <center>{builderTitle}</center>
                </div>
                <Menu theme="dark" onSelect={this.onMenuSelect} defaultSelectedKeys={[selectedItem]} defaultOpenKeys={[openItem]} mode="inline">

                    {menuItems.map((menu) => {
                        const {label, key, children=[]} = menu;
                        if (children.length > 0) {
                            return <SubMenu
                                key={key}
                                title={<span><span>{label}</span></span>}
                            >
                                {children.map(subMenu => {
                                    const {label:subLabel, key:subKey} = subMenu;
                                    return <Menu.Item key={subKey}><NavLink to={mainUrl+'/'+key+'/'+subKey}>{subLabel}</NavLink></Menu.Item>
                                })}
                            </SubMenu>
                        } else {
                            return <Menu.Item key={key}>
                                <NavLink to={mainUrl+'/'+key}>{label}</NavLink>
                            </Menu.Item>;
                        }
                    })}

                    <Menu.Divider />
                    <Menu.Item key="exit">
                        <NavLink to={exitURL}> <Icon type="poweroff" /> <span>Exit</span></NavLink>
                    </Menu.Item>


                </Menu>
            </Sider>
            <Layout>
                {plan.title != '' && <Header style={{background: '#fff', padding: 0}}>
                    <div style={{
                        height: 64,
                        background: '#fff',
                        position: 'relative'
                    }}>
                    <center><h3>{plan.title}</h3></center>
                    </div>
                </Header>}
                <Content style={{margin: '16px'}}>
                <PlanbuilderContent {...props} routes={menuItems} type={type} />
                </Content>
                <Footer style={{textAlign: 'center', background: 'transparent'}}>
                    Copyright © 2010-2018 Fitango Inc. All rights reserved
                </Footer>
            </Layout>
        </Layout>
    )
}

export default PlanbuilderLayout;
