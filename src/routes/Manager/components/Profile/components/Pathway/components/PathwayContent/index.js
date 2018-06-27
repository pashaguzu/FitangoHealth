import React from 'react';
import { Select, Card, Icon, Menu, Dropdown, Tooltip } from 'antd';
import PathwayBody from '../../containers/PathwayBody';
import PathwaySelect from './containers/PathwaySelect';
import keydown from 'react-keydown';
import {compose, lifecycle, withState} from 'recompose';

const Option = Select.Option;





class PathwayContent extends React.Component {


    constructor(props) {
        super(props);
        const {pathway=false} = props;
        this.state = {
            pathway,
            current:0,
        }
    }

    static defaultProps = {
    }

    setPathway = (pathway) => {
        //console.log(value);
        this.setState({pathway});
    }
    setCurrent = (current) => {
        if (current === 'next') {
            this.setCurrent(this.state.current+1) ;
        } else if (current === 'prev') {
            if (this.state.current > 0) {
                this.setCurrent(this.state.current - 1);
            }
        } else {
            this.checkOnScroll(current);
            //console.log(value);
            this.setState({current});
            // scroll to
            //console.log(this.refs);
        }
    }

    checkOnScroll = (current) => {
        // check if we need to scroll
        //current
    }
    cancePathway = () => {
        this.setState({pathway:false})
    }


    // getDerivedStateFromProps(nextProps) {
    //     if (!nextProps.loading) {
    //         const {pathway} = nextProps;
    //         console.log(nextProps, 'getDerivedStateFromProps');
    //         if (pathway.id) {
    //
    //             this.setPathway(pathway.id, pathway.title);
    //         }
    //     }
    // }
    componentWillReceiveProps (nextProps) {
        if (!nextProps.loading) {
            const {pathway} = nextProps;
            //console.log(nextProps, 'willreceiveprops');
            if (pathway.id) {

                this.setPathway(pathway);
            }
        }
    }

    handleMenuClick = (e) => {
        if (e.key === 'leave') {
            this.props.leavePathway(this.state.pathway.id).then(() => {
                this.cancePathway();
            });
        }
    }



    render() {

        const {loading, userId} = this.props;
        let {pathway, current} = this.state;
        const {id:pathwayId='', title="Pathway", version='', cancer={}} = pathway;
        //console.log(pathwayId);

        console.log(cancer);
        if (pathwayId) {
            const {title:cancerTitle=''} = cancer;
            return (<PathwayBodyCardEnhanced
                title={title+' - '+cancerTitle+(version !== '' ? ' - v'+version : '')} loading={loading} pathwayId={pathwayId} userId={userId} onAdd={this.props.onAdd} setCurrent={this.setCurrent} current={current} handleMenuClick={this.handleMenuClick}
            />);
                // <Card title={title} loading={loading} extra={pathwayId ? <React.Fragment><Tooltip title="Previous Element (Shift+Up)"><Icon type="left-circle-o" onClick={() => this.setCurrent('prev')} /></Tooltip> <Tooltip title="Next Element (Shift+Down)"><Icon type="right-circle-o" onClick={() => this.setCurrent('next')} /></Tooltip> <Dropdown overlay={menu} trigger={['click']}><Icon type="setting" /></Dropdown></React.Fragment> : <Icon type="setting" />} bodyStyle={{overflowY:'auto', height:'100vh'}}>
                //      <PathwayBody  userId={userId} onAdd={this.props.onAdd} id={pathwayId} currentInOrder={current} setCurrentInOrder={this.setCurrent} />
                // </Card>);
        }

        return (
            <Card title={title} loading={loading} extra={<Icon type="setting" />} bodyStyle={{overflowY:'auto', height:'100vh'}}>
                    <PathwaySelect userId={userId} onSelect={this.setPathway} />
            </Card>);
    }
}

export default PathwayContent;

const PathwayBodyCard = props => {
    const menu = (
        <Menu onClick={props.handleMenuClick}>
            <Menu.Item key="leave">Leave Pathway</Menu.Item>
        </Menu>
    );
    const {title, loading, pathwayId, userId, onAdd, setCurrent, current, openElement, setOpenElement } = props;
    return <Card title={title} loading={loading} extra={pathwayId ? <React.Fragment><Tooltip title="Previous Element (Shift+Up)"><Icon type="left-circle-o" onClick={() => setCurrent('prev')} /></Tooltip> <Tooltip title="Next Element (Shift+Down)"><Icon type="right-circle-o" onClick={() => setCurrent('next')} style={{marginRight:5}} /></Tooltip> <Dropdown overlay={menu} trigger={['click']}><Icon type="setting" /></Dropdown></React.Fragment> : <Icon type="setting" />} bodyStyle={{overflowY:'auto', height:'100vh'}}>
        <PathwayBody  userId={userId} onAdd={onAdd} id={pathwayId} currentInOrder={current} setCurrentInOrder={setCurrent} openElement={openElement} setOpenElement={setOpenElement} />
    </Card>
}


const KEYS = [ 'shift+up', 'shift+down', 'enter'];
const enhance = compose(
    keydown(KEYS),
    withState('openElement', 'setOpenElement', false),
    lifecycle({
        componentWillReceiveProps( nextProps ) {
            //console.log(nextProps);
            const { keydown: { event } } = nextProps;
            if ( event ) {
                if (event) {
                    const  {type, key} = event;
                    //console.log(event);
                    if (type === 'keydown') {
                        if (key === 'ArrowDown') {
                            nextProps.setCurrent('next');
                        } else if (key === 'ArrowUp') {
                            nextProps.setCurrent('prev');
                        } else if (key === 'Enter') {
                            //console.log('add plan');
                            nextProps.setOpenElement(true);
                        }
                    }
                    //console.log(event);
                    //type
                }
                //this.setState( { key: event.which } );

                //
            }
        }

    }),
    //branch(props => props.openElement(), renderComponent(<TimelineElementModal userId={userId} pathway={pathway} {...element} onHide={this.onHide} />))
);
const PathwayBodyCardEnhanced =  enhance(PathwayBodyCard);