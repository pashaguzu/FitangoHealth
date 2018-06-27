import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import {withRouter} from 'react-router-dom';
import IdleTimer from 'react-idle-timer';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

// import extra
import { Spin, Modal, Icon} from 'antd';
import VerifyPhone from '../routes/User/containers/verifyPhoneContainer';
import {CustomizedLabelsProvider, ActiveUserProvider} from "../components/App/app-context";
// import main layouts
import ManagerLayout from './components/ManagerLayout';
import PatientLayout from './components/PatientLayout';


/**
 * Show proper layout according to current role
 */
class CoreByMode extends React.Component {

    render() {

        const {currentRole} = this.props;

       /* if (loading) {
            return <Card loading/>
        }

        */
        //console.log(currentRole);
        //return null;
        if (!currentRole || currentRole === 'patient') {
            return <PatientLayout {...this.props} />;
        } else {
            return <ManagerLayout {...this.props} />;
        }
    }
}

/**
 * Get current role of the patient from cache
 */
export const GET_CURRENT_ROLE_QUERY = gql`
    query GET_CURRENT_ROLE {
      account {
         currentRole
         token
      }
    }
`;

const withQuery = graphql(
    GET_CURRENT_ROLE_QUERY,
    {
        options: () => {
            return {
                fetchPolicy: 'cache-only'
            }
        },
        props: ({data}) => {


            if (!data.loading) {
                return {
                    currentRole: data.account.currentRole,
                    token: data.account.token,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
)


const CoreByModeWithQuery = withQuery(CoreByMode);


class Core extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isIddle: false};
        this._onActive = this._onActive.bind(this);
        this._onIdle = this._onIdle.bind(this);
        this._onLogout = this._onLogout.bind(this);
    };

    static propTypes = {
        loading: PropTypes.bool,
        modalChildrens: PropTypes.array,
        hideModal: PropTypes.func
    };

    static defaultProps = {
        children: null,
        user: null,
        loading: false,
    };

    _onLogout() {

    };

    _onActive() {
        this.setState({isIddle: false});
    };

    _onIdle() {
        this.setState({isIddle: true});
    };

    render() {

        const {loading, user, labels={}} = this.props;
        if (loading) {
            return (
                <div style={{
                    height: '100%', width: '100%', overflow: 'auto', display: 'flex', top: '50%', position: 'absolute',
                    'minHeight': '100vh',
                    'flexDirection': 'column'
                }}>
                    <Spin indicator={<Icon type="loading" style={{fontSize: 24}} spin/>}/>
                </div>
            );
        }

        if (user.info.id && !user.info.phoneConfirmed) {
            return (
                <VerifyPhone/>
            )
        }
        return (

            <React.Fragment>
                {this.state.isIddle ? <Modal title="No Activity" visible={true}
                                             onCancel={this._onLogout}
                                             onOk={this._onActive} okText="Continue" cancelText="Logout">
                        You've been inactive. Would you like to continue or logout
                    </Modal> :
                    ( user.info.id ?
                        <IdleTimer
                            ref="idleTimer"
                            element={document}
                            idleAction={this._onIdle}
                            timeout={1000 * 60 * 15}
                            format="MM-DD-YYYY HH:MM:ss.SSS">
                            <CustomizedLabelsProvider labels={labels}>
                                <ActiveUserProvider user={user} >
                                    <CoreByModeWithQuery {...this.props} />
                                </ActiveUserProvider>
                            </CustomizedLabelsProvider>
                        </IdleTimer> : <PatientLayout {...this.props} />)
                }
            </React.Fragment>)
    }
}


const mapStateToProps = (state) => {
    let {labels=[]} = state.network;
    let networkLabels = {};
    labels.map(label => {
        networkLabels[label['key']] = label['label'];
        return null;
    });
    return {
        loading: state.network.loading,
        //token: state.user.token,
        user: state.user,
        labels: networkLabels,
    }
};


const mapDispatchToProps = () => {

    return {
    }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Core));