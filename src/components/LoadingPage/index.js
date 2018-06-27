import React from 'react'
import {Spin, Icon} from 'antd';

export default function LoadingPage(props) {
    if (props.isLoading) {
        // While our other components is loading...
        if (props.timedOut) {
            // In case we've timed out loading our other components.
            return <div>Loader timed out!</div>;
        } else if (props.pastDelay) {
            // Display a loading screen after a set delay.
            return <div style={{
                height: '100%', width: '100%', overflow: 'auto', display: 'flex', top: '50%', position: 'absolute',
                'minHeight': '100vh',
                'flexDirection': 'column'
            }}>
                <Spin indicator={<Icon type="loading" style={{fontSize: 24}} spin/>}/>
            </div>;
        } else {
            // Don't flash "Loading..." when we don't need to.
            return null;
        }
    } else if (props.error) {

        // If we aren't loading, maybe
        return <div>Error! Component failed to load </div>;
    } else {
        // This case shouldn't happen... but we'll return null anyways.
        return null;
    }
}