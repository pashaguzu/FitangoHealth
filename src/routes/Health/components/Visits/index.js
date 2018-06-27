import React from 'react';


export default class Records extends React.Component{

    render() {
        return (
            <div>
                {/*<div style={{textAlign:'right'}}>
                <Button size="small"><Icon type="plus" /></Button>
            </div>*/}
                <div className="ant-list-empty-text">No visits has been added</div>

            </div>
        );
    }
}