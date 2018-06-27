/**
 * Created by Pavel on 09.12.2017.
 */
import React from 'react';
import {Row, Col} from 'antd';
import Avatar from '../Avatar'
import Truncate from 'react-truncate';
import {Link} from 'react-router-dom';

export class AvatarWithName extends React.PureComponent {

    static defaultProps = {
        align: 'h',
        useLink: true,
    }

    render() {
        const {user={}, size} = this.props;
        const {info=user, align, useLink} = this.props;
console.log(this.props);
        const name = info.fullName ? info.fullName : ((info.firstName && info.firstName !== ' ') ? info.fullName : (info.email ? info.email : 'N/A'));


        let avatarWithName = <span><Avatar info={info} size={size}/> <span style={{verticalAlign: 'middle', marginLeft:5}}>{name}</span></span>;
        if (useLink) {
            avatarWithName = <Link to={'/u/' + info.id} style={{color: 'inherit'}}>{avatarWithName}</Link>;
        }
        return (
            <React.Fragment>
                {
                    align === "v" ?
                        info.firstName ?
                            <Row>
                                <Avatar info={info}/>
                                <p>{info.firstName}</p>
                            </Row> :
                            info.email ?
                                <Row>
                                    <Avatar info={info}/>
                                    <Truncate lines={2}><p>{info.email}</p></Truncate>
                                </Row> :
                                <center>
                                    <Avatar info={info}/>
                                    <p>No name</p>
                                </center>
                        :
                        avatarWithName
                }
            </React.Fragment>
        );
    }
}

export default AvatarWithName;