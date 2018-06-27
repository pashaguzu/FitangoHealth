import React from 'react';
import ReactPhotoGrid from 'react-photo-grid';
import {Timeline, Tag, Tooltip, Card, Popover, Icon, Row, Col, Progress, Badge, Avatar} from 'antd';
import Truncate from 'react-truncate';
import moment from 'moment';
import TimelineElementDelete from './containers/TimelineElementDelete';
import TimelineElementEdit from './containers/TimelineElementEdit';
import {injectIntl} from 'react-intl';
import LinkElement from '../../../../../../../../../Plan/components/Plan/components/LinkElement';
import MediaElement from '../../../../../../../../../Plan/components/Plan/components/PlanMedia';
import ClinicalNoteElement from '../../../../../../../../../Plan/components/Plan/components/ClinicalNoteElement';
import Checklist from '../../../../../../../../../Plan/components/Plan/components/Checklist';
import CancerStage from '../../../../../../../../../Plan/components/Plan/components/CancerStage/view';
import './styles.less';
import TreatmentElement from "../../../../../../../../../Plan/components/Plan/components/TreatmentElement/index";
import { DragSource } from 'react-dnd'
import {branch, compose, renderComponent} from 'recompose';
import TumorboardView from "../../../../../../../Tumorboard/containers/TumorboardView";
import {FitIcon} from "../../../../../../../../../../components/FitIcon/index";
import {CommentsModalFromIcon, Comments} from "../../../../../../../../../../components/Comments/index";
import {PlanAvatar} from "../../../../../../../../../../components/Avatars/components/PlanAvatar/index";
import {getIconByFileType, formatFileName} from "../../../../../../../../../../components/FormCustomFields/components/Attachments/index";

export const getTimelineElementCardTitle = (item) => {
    // console.log(item, 'item');
    const {activity={}} = item;
    let {type, typeText} = item;
    let elTitle = '';
    let {title='', label='', text=''} = activity || {};

    //console.log(title, 'item');
    switch (type) {
        case 'clinical_note':
            elTitle = title;
            break;
        case 'link':
            let {url=''} = activity;
            elTitle = label+(url ? ' '+url : '');
            break;
        case 'media':
            const {mediaType} = activity;
            typeText = mediaType;
            elTitle = label;
            break;
        case 'treatment':
            elTitle = title;
            console.log(elTitle);
            break;
        case 'checklist':
            elTitle = label;
            break;
        case 'health_record':
        case 'add_health':
            let {typeText} = activity;
            elTitle = typeText;//+' - '+title;
            break;
    }

    return typeText+(elTitle !== '' ? ' - '+elTitle : '');

}

const colorsByType = {
    updates: '#4285F6',
    todo: '#fed835',
    plan: '#f5511e',
    treatment: '#34A853',
    health: '#ee685c',
    media: '#2a2a2a',
    visit: '#7baf41',
    cancer_stage: '#8c25a8',
    tumorboard: '#3f51b5',
    team: '#ed6d01'
}

const getColor = type => {
    return colorsByType[type] || '#f2f2f2';
}



export const TimelineElementView = (item, props={}) => {
    const {handleReport=false} = props;

    const {activity, type, getReport={}} = item;
    //const {key, item, userId, showElement=false, getOnlyActivity=false, activeElement={}} = props;
    //const {activity, isCritical, date, notes, type = '', createdAt, creator = {}, source=''} = item;
    //const {id, fullName} = creator;
    //const {id:activeElementId} = activeElement;
    //console.log(item);
    //console.log(activity);
    let activityText = '';//'Unknown Activity'; 5 03 13. +375259420637 прописка и первая. и копия удостоверение.
    //let extra = {};
    let body = [];
    let image = '';
    let group = 'updates';
    //let color = '';
    let percent = 0;
    let progress = '';
    //let description = notes;
    let icon = <Icon type='api' />;
    switch (type) {
        case 'basic':
            activityText = activity.text;
            body.push(activity.text);
            break;
        case 'link':
            activityText = <LinkElement item={activity} />;
            icon = <Icon type='link' />;
            body.push( activity.description || '');
            break;
        case 'media':
            const {mediaType:activityType='', filename:label=''} = activity;
            activityText = <MediaElement item={activity} />;
            icon = getIconByFileType({type:activityType, label});
            console.log(icon);
            progress = formatFileName(activity);
            //body.push( activity.description || '');
            break;
        case 'clinical_note':
            icon = <FitIcon icon='clinical-note' />;
            activityText = <ClinicalNoteElement item={activity} cardOpts={ {bordered:false, type:"timeline"}} />;
            if (activity.note !== '') {
                body.push(activity.note);
            }

            const {attachments = []} = activity;
            let imageData2 = attachments.filter(item => item.type === 'image');
            imageData2 = imageData2.map(image => image.url);
            //console.log(imageData2);

            if (imageData2.length > 4) {
                imageData2 = imageData2.slice(0, 4);
            }
            //console.log(imageData2);
            //ReactPhotoGrid
            // if (imageData2.length > 0) {
            //     image = <div style={{width: 200, height: 200, overflow: 'hidden'}}><ReactPhotoGrid
            //         gridSize="200x200"
            //         data={imageData2}/>
            //
            //     </div>;
            // }
            break;
        case 'treatment':
            group = 'treatment';
            icon = <FitIcon icon='treatment' />;
            progress = <Progress percent={0} />;
            const {details:treatmentDetails} = activity || {};
            activityText = <TreatmentElement item={treatmentDetails} handleReport={handleReport} />;//<Card type="timeline ant-card-type-treatment" bordered={false} title="Treatment" extra={extra} >
            break;
        case 'checklist':
            const {value:reportValues=[]} = getReport || {};
            activityText = <Checklist item={activity} handleReport={handleReport} reports={reportValues}  />;
            const total = activity.options.length || 0;
            if (reportValues.length > 0) {
                // let reported = 0;
                // reports.map(report => {
                //     console.log(report.value, 'reportValue');
                //     reported += report.value.length;
                //     return null;
                // });

                percent = reportValues.length/total*100;
                if (percent > 0) {
                    percent = Math.floor(percent);
                }
            }
            progress = <Checklist item={activity} handleReport={handleReport} reports={reportValues} simple  />;
            group = 'todo';
            icon = <FitIcon icon="to-do"/>
            break;
        case 'cancer_stage':
            group = 'cancer_stage'
            activityText = <CancerStage item={activity}  />;
            icon = <FitIcon icon="stage"/>
            break;
        case 'health_record':
        case 'add_health':
            //activityText = activity.title;
            group = 'health';
            icon = <Icon type='medicine-box' />;
            body.push(activity.title);
            break;
        case 'clinical_trial':
            activityText = activity.title;
            body.push(activityText);
            //console.log(activityText, 'CLTRIAL');
            //body.push(activity.notes);
            group = 'health';
            icon = <FitIcon type='evaluation' />;
            break;
        case 'tumorboard':
            //activityText = activity.title;
            activityText = <TumorboardView tumorboard={activity}   />;
            group = 'tumorboard';
            icon = <FitIcon icon="tumorboard"/>
            body.push(activity.notes);
            break;
        case 'request_join_user_manager':
            icon = <FitIcon icon="actionplan"/>;
            group = 'team';
            break;
        case 'plan_assigned':
            const {plan = {}} = activity;
            icon = <FitIcon icon="actionplan"/>;
            activityText = <PlanAvatar plan={plan} />;
            progress = plan.title;
            break;
        case 'plan_created':
            icon = <FitIcon icon="actionplan"/>;
            activityText = <PlanAvatar plan={activity} />;
            progress = activity.title;
            break;
        case 'plan_approved':
        case 'plan_share_hp_approved':
            icon = <FitIcon icon="actionplan"/>;
            group = 'plan';
            body.push(activity.text);
            break;
        default:
            //activityText = activity.text;
            body.push(activity.text);
            break;
    }
    const color = getColor(group);

    const title = getTimelineElementCardTitle(item);

    return {body, color, activityText, image, icon, progress, title};
}
class TimelineElement extends React.PureComponent {

    render() {

        console.log(this.props,' Element props');
        const {key, item, userId, showElement=false, getOnlyActivity=false, activeElement={}, handleReport=false} = this.props;
        const {id: telid, activity, isCritical, date, notes, type = '', createdAt, creator = {}, source=''} = item;
        const {id, fullName} = creator;
        const {id:activeElementId} = activeElement;
        //console.log(item);
        //console.log(activity);
        //let activityText = '';//'Unknown Activity';
       // let extra = {};
        //let body = [];
        //let image = '';
        //let color = '';
        //let progress = '';
        //let description = notes;
        //let icon = 'api';

        // switch (type) {
        //     case 'basic':
        //         activityText = activity.text;
        //         body.push(activity.text);
        //         break;
        //     case 'link':
        //         activityText = <LinkElement item={activity} />;
        //         icon = 'link';
        //         color = 'red';
        //         body.push( activity.description || '');
        //         break;
        //     case 'clinical_note':
        //         color = '#orange';
        //         icon = 'file-text';
        //         activityText = <ClinicalNoteElement item={activity} cardOpts={ {bordered:false, type:"timeline"}} />;
        //         if (activity.note !== '') {
        //             body.push(activity.note);
        //         }
        //
        //         const {attachments = []} = activity;
        //         let imageData2 = attachments.filter(item => item.type === 'image');
        //          imageData2 = imageData2.map(image => image.url);
        //         //console.log(imageData2);
        //
        //         if (imageData2.length > 4) {
        //             imageData2 = imageData2.slice(0, 4);
        //         }
        //         console.log(imageData2);
        //         //ReactPhotoGrid
        //         if (imageData2.length > 0) {
        //             image = <div style={{width: 200, height: 200, overflow: 'hidden'}}><ReactPhotoGrid
        //                 gridSize="200x200"
        //                 data={imageData2}/>
        //
        //             </div>;
        //         }
        //         break;
        //     case 'treatment':
        //         color = '2db7f5';
        //         icon = 'appstore-o';
        //         progress = <Progress percent={0} />;
        //         activityText = <TreatmentElement item={activity}  />;//<Card type="timeline ant-card-type-treatment" bordered={false} title="Treatment" extra={extra} >
        //         break;
        //     case 'checklist':
        //         activityText = <Checklist item={activity}  />;
        //         progress = <Progress percent={0} />;
        //         color = '#f56a00';
        //         break;
        //     case 'cancer_stage':
        //         color = '#87d068';
        //         activityText = <CancerStage item={activity}  />;
        //         break;
        //     case 'health_record':
        //         activityText = activity.title;
        //         color = '#f56a00';
        //         icon = 'medicine-box';
        //         break;
        //     default:
        //         activityText = activity.text;
        //         color = '#108ee9';
        //         body.push(activity.text);
        //         break;
        // }
        const {body, color, activityText, image, icon, progress, title} = TimelineElementView(item, {handleReport});

        let boxTitle = title;
        //activityText = <Card type="timeline" title={} extra={extra} >{activityText}</Card>;
        if (notes !== '') {
            body.push(<div style={{fontSize:'0.9em',color:'#ccc'}}>{notes}</div>);
        }

        if (getOnlyActivity) {

            // if (1===1) {
            //     extra = [
            //
            //    ];
            // }
            return <React.Fragment>
                <Card title={title}
                         extra={[<TimelineElementEdit item={item} userId={userId} />, <TimelineElementDelete item={item} userId={userId} />]}
            >
                {activityText}
                    {body && <div>{body}</div>}

                <div className="ant-card-comments">
                    <Comments type="timeline" id={telid} title="Notes" />
                </div>
            </Card>



            </React.Fragment>;
        }

        let infoContent = [
            <Tooltip title="Created"><div><Icon type="clock-circle-o" style={{marginRight:5}} />{moment(createdAt).format('LLL')}</div></Tooltip>
            ];

        if (source) {
            // infoContent.push(<Tooltip title="Source">
            //     <div>
            //         <div style={{
            //             marginRight:5,
            //             border: '1px solid rgba(0, 0, 0, 0.85)',
            //             borderRadius: '50% 50%',
            //             lineHeight: '1.12em',
            //             fontSize: '0.8em',
            //             'textAlign': 'center',
            //             height: 14,
            //             width: 14,
            //             display: 'inline-block'
            //         }}>P</div>
            //         {source}</div>
            // </Tooltip>);


            boxTitle = <React.Fragment>
                {boxTitle} <Tooltip title={source}>
                <div style={{
                    marginRight:5,
                    border: '1px solid #51ade2',
                    borderRadius: '50% 50%',
                    lineHeight: '1.3em',
                    'textAlign': 'center',
                    height: 20,
                    width: 20,
                    fontWeight: 'normal',
                    display: 'inline-block',
                    color:'#51ade2'
                }}>P</div>
            </Tooltip>

            </React.Fragment>
        }
        //infoContent.push(<div><Icon type="message" style={{marginRight:5}} />Add Note</div>);


        const html =  <Card type={"timeline"+ (activeElementId === item.id ? ' active-element' : '')} hoverable onClick={() => showElement(item)}  >
            {isCritical && <span style={{position:'absolute', top:0, right:2, lineHeight:'1em'}} ><Tooltip title="Critical"><Badge dot /></Tooltip></span>}
            <div className={"timeline-icon"} style={{backgroundColor: color}}>
                {icon}
            </div>
            <div className="timeline-text">
                <div className="timeline-actions"  >

                        <CommentsModalFromIcon type="timeline" id={telid} />
                   <Popover key="1" title={[<Icon type="user" key="user" style={{marginRight:5}}  />, <span key="fullname">{fullName}</span>]} content={infoContent} trigger="hover"><Icon type="info-circle-o" style={{marginLeft:5}} /></Popover>
                </div>
                <div className="timeline-date"><Icon type="clock-circle-o" style={{marginRight:5, display:'none'}} />{moment(createdAt).format('L')}</div>

                {image && <div className="timeline-image">{image}</div>}
                <h4 style={{margin:0}}>{boxTitle}</h4>
                {progress}
                <Truncate lines={1}>{body}</Truncate>
            </div>
        </Card>;
        return html;
        // const infoContent = [
        //     <Tooltip title="Created"><div><Icon type="clock-circle-o" style={{marginRight:5}} />{moment(createdAt).format('LLL')}</div></Tooltip>,
        //     <Tooltip title="Source"><div><Icon type="book"  style={{marginRight:5}} />{source}</div></Tooltip>,
        //     <div><Icon type="message" style={{marginRight:5}} /> Add Note</div>
        // ];
        // return (
        //     color={isCritical ? "red" : undefined}
        //     {/*<Timeline.Item key={key} color={isCritical ? "red" : undefined} className="timeline_el"><Popover key="1" title={[<Icon type="user"  style={{marginRight:5}}  />, fullName]} content={infoContent} trigger="hover"><Tag color={isCritical ? 'red' : "blue"}>{moment(date).format('L')}</Tag></Popover> <div className={'timeline_el_text'}>{activityText}</div></Timeline.Item>*/}
        //
        // <Popover key="1" title={[<Icon type="user"  style={{marginRight:5}}  />, fullName]} content={infoContent} trigger="hover"><Tag color={isCritical ? 'red' : "blue"}>{moment(date).format('L')}</Tag></Popover> <div className={'timeline_el_text'}>{activityText}</div>
        // );
    }
}



export const canBeDraggable = (element) => {
    console.log(element);
    return true;
    return element.type !== 'tumorboard';// && element.type !== 'condition';
}
const boxSource = {
    beginDrag(props) {
        //console.log(props);
        return {
            item: props.item,
        }
    },

    endDrag(props, monitor) {
        const item = monitor.getItem()
        const dropResult = monitor.getDropResult()

        if (dropResult) {
            props.onDrop(item);
            //alert(`You dropped ${item.element.type} into ${dropResult.name}!`) // eslint-disable-line no-alert
        }
    },
    canDrag(props, monitor) {
        console.log(props);
        return canBeDraggable(props.element);
    }
}

const TimelineElementDraggablePure = props => {
    const { isDragging, connectDragSource } = props
    const opacity = isDragging ? 0.4 : 1

    return connectDragSource(<div style={{opacity, marginBottom:10}}><TimelineElement {...props}/></div>);
}
const TimelineElementDraggable = DragSource('box', boxSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))(TimelineElementDraggablePure);

const enhance = compose(
    injectIntl,
    branch(props => props.draggable, renderComponent(TimelineElementDraggable))
);

export default enhance(TimelineElement);