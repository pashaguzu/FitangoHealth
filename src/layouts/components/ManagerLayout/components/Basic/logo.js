import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom';



const Logo = props => {
    return <Link to={'/'}><img alt="" className="logo" style={{height:'50px', marginRight:'5px'}} src={props.network.logo} /></Link>
}


const mapStateToProps = (state) => {

    return {
        network:    state.network,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default  connect(
    mapStateToProps,
    mapDispatchToProps
)((Logo));