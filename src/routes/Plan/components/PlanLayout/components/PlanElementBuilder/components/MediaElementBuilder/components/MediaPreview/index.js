import React from 'react';


const MediaPreview = ({typeMedia, details={}, tmpMedia={}}) => {
    console.log(details);
    console.log(tmpMedia);
    let {url='', filename='', mediaType=''} = details;
    const type = typeMedia || mediaType;

    switch(type) {
        case 'image':
            const {original=[]} = tmpMedia;
            if (original.length > 0) {
                const tmpInfo = original[0];
                //console.log(tmpInfo);
                let {name:filename, signed_ssl_url:url} = tmpInfo;
                //console.log(filename);
                //console.log(url);
                //console.log(type);
                return <div><img src={url} style={{width:'100%'}} /></div>;
            }
            return <div><img src={url} style={{width:'100%'}} /></div>;
            break;
        default:
            const files = tmpMedia[':original'] || [];
            if (files.length > 0) {
                const tmpInfo = files[0];
                console.log(tmpInfo);
                let {name, signed_ssl_url:url=url} = tmpInfo;
                return <MediaDocument url={url} name={name} />;
            }
            return <MediaDocument url={url} name={filename} />;
            break;
    }
    return <div>Media</div>;
}

export default MediaPreview;



const MediaDocument = ({url, name}) => {
    return <div><a href={url} target="_blank">{name}</a></div>;
}