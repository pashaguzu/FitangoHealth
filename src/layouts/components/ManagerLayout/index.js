import React from 'react'
import {NavLink, Switch, Route} from 'react-router-dom';
import {Layout, Menu, Icon} from 'antd';
import {BasicRoutes} from '../../routes';
import {ManagerRoutes} from './routes';
import RightMenu from '../../components/Header/containers/RightMenu';
import PrivateRoute from '../../../routes/privateRoute';
import {asyncPlanbuilder} from '../../../routes/manager';

import BasicLayout from './components/Basic';

const {Sider, Header, Content, Footer} = Layout;
const SubMenu = Menu.SubMenu;

const ManagerLayout = ({loading, user, store, location}) => {
    return (
            <Switch>
            <Route path="/pb/type/:type" component={asyncPlanbuilder(store)}/>
            <Route path="/pb/:id?/:tab?/:subtab?" component={asyncPlanbuilder(store)}/>
            <Route component={BasicLayout} />
            </Switch>
    )
}

export default ManagerLayout;
