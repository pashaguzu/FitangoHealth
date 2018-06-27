import React from 'react'
import {Row, Col, Tag, Affix } from 'antd';
import PlanElementBuilder from '../../containers/PlanElementBuilder';//PlanElementBuilder/containers/PlanElementManagerAdd
import PlanElementSelect from '../PlanElement/components/PlanElementSelect';

export class PlanElementsSelectbox extends React.Component {
    state = {
        openAddElement:false,
        type:''
    }

    static propTypes = {
    };

    static defaultProps = {
        isBuilderMode:false,
        parentId:'',// element
        caseValue:'',// case iD(for options - it's option ID, for tracker - it's value)
        mode: ''// section, introduction, lesson, pathway modes...
    }

    onSelect = (type) => {
        this.setState({openAddElement:true, type})
    }

    hideElementAddModal = () => {
        this.setState({openAddElement:false, type: ''});
        console.log(this.props);
        if (this.props.onHide) {
            this.props.onHide();
        }

    }


    render() {

        const {mode} = this.props;


        return (<Row gutter={5} >
            {this.state.openAddElement && <PlanElementBuilder {...this.props} mode={mode} type={this.state.type} onHide={this.hideElementAddModal} />}

            <Affix><div style={{backgroundColor: '#ffffff'}}><PlanElementSelect mode={mode} onSelect={this.onSelect} /></div></Affix>
        </Row>)
    }
}

export default PlanElementsSelectbox;