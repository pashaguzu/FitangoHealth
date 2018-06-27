import React from 'react';
import iconPaths from '../../assets/icons/selection';
import  '../../assets/icons/style.css';

function getPath(iconName) {
    const icon = iconPaths.icons.find(icon => icon.properties.name === iconName);

    if (icon) {
        return icon.icon.paths.join(' ');
    } else {
        console.warn(`icon ${iconName} does not exist.`);
        return '';
    }
}


export const FitIcon = props => {
    const {type=''} = props;
    const {icon=type, width=17, height=17, align='baseline'} = props;
    // const styles = {
    //     svg: {
    //         display: 'inline-block',
    //         verticalAlign: 'middle',
    //     },
    //     // path: {
    //     //     fill: props.color,
    //     // },
    // };
    return <i className={"ico-"+icon} style={{verticalAlign:align}} />;
    // return <svg style={styles.svg} width={width} height={height} viewBox="0 0 1024 1024">
    //     <path d={getPath(icon)}></path>
    // </svg>
    //const className = 'fitango-moo'+type;
    // return <svg class={'icon '+type}><use xlink:href={'#'+type}></use></svg>;
    // return <i className={className} ></i>;
}
