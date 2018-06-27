import React from 'react';
import {Breadcrumb} from 'antd';
import { Link } from 'react-router-dom';


export default class Breadcrumbs extends React.Component {

    constructor(props){
        super(props);
        this.handleBreadcrumbChange = this.handleBreadcrumbChange.bind(this);
        this.state = {breadcrumbitems: ''};
    }

    handleBreadcrumbChange(breadcrumbitems) {

        //this.setState({breadcrumbitems: breadcrumbitems});
    }

    render() {

        let Crumb = [];
        if(this.state.breadcrumbitems) {
            this.state.breadcrumbitems.map((bc) => {
                Crumb.push(
                    <Breadcrumb.Item><Link to={bc[0]}>{bc[1]}</Link></Breadcrumb.Item>
                )
            })

        }
        return ( <Breadcrumb separator=">">
            <Breadcrumb.Item><Link to="/community">Community</Link></Breadcrumb.Item>
            {Crumb}
        </Breadcrumb>)
    }
}

