import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom';
import ReactPlaceholder from 'react-placeholder';
import RightMenu from './containers/RightMenu';
import { Row, Col, Menu} from 'antd';
import {GetGlobalLabel} from "../../../components/App/app-context";




class LHeader extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.toggleUser = this.toggleUser.bind(this);
        this.state = {
            isOpen: false,
            isOpenUser: false,
            loading: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    toggleUser() {
        this.setState({
            isOpenUser: !this.state.isOpenUser
        });
    }
    render() {
        const loading = this.props.loading;
        const token = this.props.token;
        const location = this.props.location;

        const menu_items = [
            ['Dashboard', '/', 'dashboard'],
            ['Planstore', '/planstore', 'planstore'],
            ['Community', '/community', 'community'],
        ];

        const menuHtml = menu_items.map((item) => {

            if (item[1] ) {
                /*<HaveModule module={item[2]}>*/

                return (
                    <Menu.Item as={NavLink} to={item[1]} key={item[1]}>
                        <NavLink to={item[1]}><GetGlobalLabel type={item[2]} defaultValue={item[0]} /></NavLink>
                    </Menu.Item>
                )
            }

            return (
                <Menu.Item key={item.toString()}>
                    <NavLink  to={item[1]}>{item[0]}</NavLink>
                </Menu.Item>)

        });

        const locationPath = '/'+location.pathname.split('/')[1];

//{/*customPlaceholder={HeaderPlaceholder}*/}

        if (!token) {
            return (
                <div style={{'textAlign':'center'}}>
                    <NavLink to="/"><img alt="" className="logo" style={{height:'50px'}} src={this.props.network.logo} /></NavLink>
                </div>
            )
        }

        return (
            <ReactPlaceholder ready={!loading} rows={3} >


                <Row type="flex" justify="space-between" align="middle">
                    <Col md={5}><Link to={'/'}><img alt="" className="logo" style={{height:'50px', marginRight:'5px'}} src={this.props.network.logo} /></Link></Col>
                    <Col>
                        <Menu
                            onClick={this.handleClick}
                            selectedKeys={[locationPath]}
                            mode="horizontal"
                            style={{'borderBottom':'none'}}
                        >
                            {menuHtml}
                        </Menu>
                    </Col>

                    <Col md={9}>
                        <RightMenu />
                    </Col>

                </Row>
            </ReactPlaceholder>
        );
    }
}


const mapStateToProps = (state) => {

    return {
        // view store:
        //currentView:  state.views.currentView,
        // userAuth:
        //messages:    state.user.info.unreadMessages,
        //notifications:    state.user.info.unreadNotifications,
        network:    state.network,
        //loading: state.user.loading,
        //user: state.user.info,
        //token: state.user.token
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default  connect(
    mapStateToProps,
    mapDispatchToProps
)((LHeader));