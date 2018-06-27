import React from 'react'
import {Card} from 'antd';
import PlanElementChildrenManager from '../../containers/PlanElementChildrenManager';
import PlanElementSelect from '../../../PlanElementSelect';

export default class PlanElementChildrenSelect extends React.Component {

    static propTypes = {};
    static defaultProps = {
        isBuilderMode: false,
        elements: [],
        mode: '',// mode of the elements
    }
    state = {
        openAddElement: false
    }
    onSelect = (type) => {
        this.setState({openAddElement: true, type})
    }

    hideElementAddModal = () => {
        this.setState({openAddElement: false, type: ''});
        this.props.onHide();
    }

    onElementAdd = (input) => {
        const inputWithType = {
            type: this.state.type,
            input
        }
        this.props.onElementAdd(inputWithType);
        this.props.onHide();
    }

    render() {


        return (<Card bordered={false} type="pure">
            {this.state.openAddElement &&
            <PlanElementChildrenManager {...this.props}
                                        type={this.state.type}
                                        onElementAdd={this.onElementAdd}
                                        onHide={this.hideElementAddModal}
            />}

            <PlanElementSelect mode={this.props.mode} view={this.props.view}   onSelect={this.onSelect}/>
        </Card>)
    }
}