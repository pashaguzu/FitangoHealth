/**
 * Created by Pavel on 09.12.2017.
 */
import React from 'react';
import {Avatar as AvatarAntd, Tooltip} from 'antd';
import {Link} from 'react-router-dom';
import './index.less';

export class Avatar extends React.PureComponent {

    static defaultProps = {
        size: 'small',
        src: '',
        useLink: false,
        info: {},
    }
    render() {

        const {src, info, size, useLink, tooltip=false} = this.props;

        // if we need a realy big avatar(profile page)
        const extraClass = size === 'huge' ? 'ant-avatar-huge' : '';

        if (src !== '') {
            return <AvatarAntd src={src} className={extraClass} size={size} style={{verticalAlign: 'middle'}} />
        }


        const {thumbs={}} = info;
        const {small='', large='', medium=''} = thumbs;
        const name = info.firstName ? info.firstName : ((info.fullName && info.fullName !== ' ') ? info.fullName : '');
        //console.log(name);
        let url = '';

        switch (size) {
            case 'huge':
                url = large;
                break;
            default:
                url = medium;
                break;
        }
        let avatar =
                <AvatarAntd src={url} className={extraClass} size={size} style={{verticalAlign: 'middle', backgroundColor: info.color}}>
                    {name ? name[0] :
                        (info.email ? info.email[0] : 'N/A' )}
                </AvatarAntd>;

                if (tooltip) {
                    avatar = <Tooltip title={name}>{avatar}</Tooltip>;
                }
        if (useLink) {
            avatar = <Link to={'/u/'+info.id}>{avatar}</Link>;
        }
        return (avatar);
    }
}

export default Avatar;