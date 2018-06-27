import React from 'react'
import {Card, Button} from 'antd';

export default class Publish extends React.Component {

    static defaultProps = {
        isBuilderMode:false,
        isPreviewMode:true,
        elements:[],
        planId:''
    }


    publish = () => {
        const {plan} = this.props;
        this.props.publish().then(({data}) => {
            // show message
            //console.log(this.props);
            if (plan.type === 'pathway') {
                this.props.history.push('/pathways');
            } else {
                this.props.history.push('/actionplans');
            }
        })
    }

    render() {
        const {type, publish} = this.props;

        return <Card title="You are ready to publish!">
            <Button type="primary" onClick={this.publish}>Click here to publish</Button>
        </Card>
    }
}