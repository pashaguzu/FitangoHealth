import React from 'react'
import {NavLink, Route, Switch} from 'react-router-dom';
import {Layout, Menu, Steps, Icon} from 'antd';
import BuildHeader from '../../containers/BuildHeader';
import BuildHeaderPathway from '../../containers/BuildHeaderPathway';
import BuildBody from '../../containers/BuildBody';
import Preview from '../../components/Preview';
import Publish from '../../containers/Publish';
import BuildBodyPathway from '../../containers/BuildBodyPathway';
import {Loading} from "../../../../../../components/Loading";

const Build = (props) => {
    console.log(props);
    const { routes, plan } = props;
    return (<Switch>
        {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
    </Switch>);
};


const RouteWithSubRoutes = route => {
    return (
        <Route
            path={route.path}
            render={props => {
                // pass the sub-routes down to keep nesting
                //console.log(props);
                return (<route.component {...props} {...route.params} routes={route.routes}/>)
            }}
        />)
};



class PlanbuilderContent extends React.Component{

    onMenuSelect = (e) => {
        console.log(e);
    }
    render() {
        const {match, location, plan={}, loading, routes:routes1, type} = this.props;

        if (loading) {
            return <Loading/>
        }
        /*console.log(props);
        console.log(location);
        console.log(plan);*/

        const {id, tab = 'build', subtab = 'header'} = match.params;

        const selectedItem = subtab || tab;
        const openItem = tab;


        let mainUrl = '/pb';
        if (id) {
            mainUrl += '/' + id;
        }
        const isPathway = type === 'pathway';

        //console.log(mainUrl);


        const routes = [

            {
                path: mainUrl + "/preview",
                component: Preview,
                params: {plan, type}
            },
            {
                path: mainUrl + "/publish",
                component: Publish,
                params: {plan, type}
            },
            {
                path: mainUrl,
                component: Build,
                routes: [
                    {
                        path: mainUrl + "/build/header",
                        component: isPathway ? BuildHeaderPathway : BuildHeader,
                        params: {plan, type}
                    },
                    {
                        path: mainUrl + "/build/body",
                        component: isPathway ? BuildBodyPathway : BuildBody,
                        params: {plan, type}
                    },
                    {
                        path: mainUrl,
                        component: isPathway ? BuildHeaderPathway : BuildHeader,
                        params: {plan, type}
                    },
                ]
            }


        ];



        return (
            <Switch>
                {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route}  />)}
            </Switch>
        )
    }
}

export default PlanbuilderContent;
