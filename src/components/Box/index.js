import React from 'react';


export const Box = (props) => {
    return (
        <div className="box">{props.children}</div>
    );

}
/*class Box extends React.Component {
    static propTypes = {
        header: PropTypes.string,
        body: PropTypes.objstringect,
    };
    render() {
        const { header, body } = this.props;
        return  <div className="box">
            <div className="box__header">
                {header}
            </div>
            <div className="box__body">
                {body}
            </div>
        </div>;
    }
}*/


export const BoxHeader = (props) => {
    return (
        <div className="box__header">{props.children}</div>
    );

}

export const BoxHeaderSettings = (props) => {
    return (
        <div className="box__header--settings">{props.children}</div>
    );

}

export const BoxBody = (props) => {
    return (
        <div className="box__body">{props.children}</div>
    );

}