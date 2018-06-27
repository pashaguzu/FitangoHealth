
import React from 'react';
import Loadable from '../../../components/Loadable';
import { Route } from 'react-router-dom';


const AsyncCategoryView = (props) => {
    return (
        Loadable({
            loader: () => import('../../../routes/Community/components/CommunityLayout/containers/Category.js'),
            modules: ['../../../routes/Community/components/CommunityLayout/containers/Category.js'],
            webpack: () => [require.resolveWeak('../../../routes/Community/components/CommunityLayout/containers/Category.js')],
},undefined, props)
    );
}

const AsyncCategoryDash = (props) => {
    return (
        Loadable({
            loader: () => import('../../../routes/Community/containers/CommunityLayout.js'),

}, undefined, props
    )
    );
}
const AsyncCommynityDiscussion = (props) => {
    return (
        Loadable({
            loader: () => import('../../../routes/Community/components/CommunityLayout/components/Discussion/containers/Discussion.js'),
}, undefined, props)
    );
}

class Community extends React.Component {

    constructor(props){
        super(props);
        this.state = {breadcrumbitems: []};
        this.handleBreadcrumbChange = this.handleBreadcrumbChange.bind(this);
        this.getBreadcrumbs = this.getBreadcrumbs.bind(this);
    }

    handleBreadcrumbChange(breadcrumbitems) {


        //this.setState({breadcrumbitems: breadcrumbitems});
    }

    getBreadcrumbs() {
        return this.state.breadcrumbitems;
    }

    render() {
        return (
            <div>
                {/*<Row style={{marginBottom: 10}}>
                    <Breadcrumbs breadcrubsHandle={this.getBreadcrumbs}  />
                </Row>*/}
                <Route exact path='/community' component={AsyncCategoryDash()} />
                <Route exact path="/community/discussion/:id" component={AsyncCommynityDiscussion({handleBreadcrumbChange:this.handleBreadcrumbChange})} />
                <Route exact path="/community/:id" component={AsyncCategoryView({handleBreadcrumbChange:this.handleBreadcrumbChange})}/>
            </div>


        )
    }
}

export default Community
