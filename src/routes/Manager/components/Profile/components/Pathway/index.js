import React from 'react';
import {Row, Col, Card} from 'antd';
import PanelGroup from 'react-panelgroup';
import moment from 'moment';
import {DragDropContextProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Timeline from './containers/Timeline';
import PathwayContent from './containers/PathwayContent';
import TimelineElementDetails from './components/Timeline/containers/TimelineElementDetails'


export default class Pathway extends React.Component {
    state = {
        showPathway: false,
        showElement: false,
        elementsDetails: [],
        activeElement: false,
        pathway: false
    }

    static defaultProps = {
        userId: ''
    }

    togglePathway = () => {
        this.setState({showPathway: !this.state.showPathway});
    }

    setPathway = (pathway) => {
        this.setState({pathway});
    }

    toggleElementView = (element) => {
        this.setState({showElement: true});
        this.updateElements(element);

    }

    updateElements = (element) => {
        let {elementsDetails = []} = this.state;
        const elements = elementsDetails.indexOf(element) === -1 ? [...elementsDetails, element] : elementsDetails;
        //console.log(elements);
        this.setState({elementsDetails: elements, activeElement: element});
    }

    setElements = (elements, element) => {
        if (elements.length === 0) {
            this.setState({showElement: false});
        }
        this.setState({elementsDetails: elements, activeElement: element});
    }

    addText = (info) => {
        console.log(info);

        const newItems = [...this.state.items, info];
        this.setState({
            items: newItems
        })
    }


    render() {
        const {user} = this.props;
        const showPathway = this.state.showPathway;
        const showElement = this.state.showElement;
        const elementsDetails = this.state.elementsDetails;
        const activeElement = this.state.activeElement;
        const span = showPathway || showElement ? 12 : 24;

        //

        return (
            <DragDropContextProvider backend={HTML5Backend}>
                <Row>
                    <Col span={span} style={{marginRight: '-1px'}}>
                        <Timeline userId={user.id} droppable togglePathway={this.togglePathway}
                                  showPathway={showPathway} showElement={this.toggleElementView}
                                  activeElement={activeElement}/>
                    </Col>
                    {showElement ?
                        <Col span={span}>
                            <TimelineElementDetails userId={user.id} elements={elementsDetails}
                                                    activeElement={activeElement}
                                                    updateElements={this.setElements}
                                                    showPathway={showPathway}
                                                    pathway={this.state.pathway}
                                                    setPathway={this.setPathway}
                                                    togglePathway={this.togglePathway}
                            />
                        </Col>
                        :
                        (showPathway && <Col span={span}>
                            <PathwayContent userId={user.id} pathway={this.state.pathway} setPathway={this.setPathway}/>
                        </Col>)
                    }
                </Row>
            </DragDropContextProvider>);
    }
}