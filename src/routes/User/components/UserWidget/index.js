import React from 'react'
import Avatar from '../../../../routes/User/components/Avatar';


export default class UserWidget extends React.PureComponent {
    static defaultProps = {
        onlyFirst: false
    }
    render() {

        const {user, onlyFirst} = this.props;
        const {firstName, fullName} = user;

        return (<span><Avatar info={user}/> <span style={{verticalAlign: 'middle'}}>{firstName}</span></span>);
    }
}
