import React from 'react'

import PlanElement from '../../containers/PlanElement'
import PlanLesson from '../../containers/PlanLesson';
import PlanSection from '../../containers/PlanSection';
import PlanIntroduction from '../../containers/PlanIntroduction';
import PlanBodyMenu from './components/PlanBodyMenu';
import './index.less';

// adding filters
// for modal
import { Modal, BackTop, List, Affix, Card, Row, Col} from 'antd';

export class PlanBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: '',
            currentKey: '',
            currentKeyI: 0,
            inited: false,

        };
        this.handleClick = this.handleClick.bind(this);
        //this.handleTab = this.handleTab.bind(this);
        this.showFirstSection = this.showFirstSection.bind(this);
        this.saveSection = this.saveSection.bind(this);
        this.showNextLesson = this.showNextLesson.bind(this);
        this.showNextSection = this.showNextSection.bind(this);
    };
    static propTypes = {
    };

    static defaultProps = {
        isBuilderMode: false,
        isPreviewMode: false,
        planId:''//'NzUyNw'
    }


    handleClick = (key, currentKeyI, tab) => {

        this.setState({
            currentTab: tab || this.state.tab,
            currentKey: key,
            currentKeyI: currentKeyI,
        });

    }

    showFirstSection () {
        this.setState({
            currentTab: 'activities',
            currentKey: 'section_0',
            currentKeyI: 0,
        });
    };

    showNextLesson = () => {
        let {currentKeyI} = this.state;
        currentKeyI++;
        this.setState({
            currentTab: 'lessons',
            currentKey: 'lesson_'+currentKeyI,
            currentKeyI: currentKeyI,
        });
    };

    saveSection = (e, sectionId, isLastSection) => {

        if (isLastSection) {
            // some message
        } else {
            this.showNextSection();
        }
    };

    showNextSection = () => {
        let {currentKeyI} = this.state;
        currentKeyI++;
        this.setState({
            currentTab: 'activities',
            currentKey: 'section_'+currentKeyI,
            currentKeyI: currentKeyI,
        });
    };






    render() {
        //console.log(this.props);
        const {showIntro, date, hideIntro, upid, activities, lessons, intro, loading, isBuilderMode, isPreviewMode, planId, plan} = this.props;
        //const planId = plan.id;
        //console.log(planId);
        let {currentTab, currentKey} = this.state;
        console.log(loading);
        if (loading) {
            return (
                <Card loading>Loading....</Card>
            );
        }

        /*const {plan} = client.readQuery({
            query: PLAN_BODY_QUERY,
            variables: {
                id: id,
                upid: upid,
                date: date
            }
        });

        const {activities, lessons, intro} = plan;
       */
        const lessonsNum = lessons.length;
        const activitiesNum = activities.length;


        if (showIntro && intro.length > 0)  {

            const introHtml =  <List
                size="large"
                itemLayout="vertical"
                split={false}
                dataSource={intro}
                renderItem={item => {
                    return <List.Item
                        id={'field' + item.id}
                        key={item.id}>
                        <PlanElement element={item} />
                    </List.Item>
                }}
            />;
            Modal.info({
                title: 'Info',
                content: (
                    introHtml
                ),
                onOk() {hideIntro()},
            });
        }

        //console.log(currentKey);
        //console.log(currentTab);
        let menuStyle = {}
        if (isBuilderMode) {
            menuStyle = {
                height: '100vh',
                background: '#fff',
                borderRight: '1px solid #e8e8e8',
                overflowY: 'auto'
            }
        }


        const showEmptyBlock = isBuilderMode && currentKey === '';

        //console.log(currentKey);
        return (<Row>
            <BackTop />
            <Col xs={5} style={menuStyle} className="plan-menu" >
                <Affix offsetTop={10} >
                    <PlanBodyMenu isBuilderMode={isBuilderMode} isPreviewMode={isPreviewMode} planId={planId}  lessons={lessons} activities={activities} onClick={this.handleClick} currentTab={currentTab} currentKey={currentKey} />
                </Affix>
            </Col>
            <Col offset={5}>

                {(currentKey === 'introduction' && isBuilderMode) && <Row>
                    <Col xs={24}>
                        <PlanIntroduction isBuilderMode={isBuilderMode} isPreviewMode={isPreviewMode} planId={planId} elements={intro} />
                    </Col>
                </Row>}
                {lessonsNum > 0 && lessons.map((section, i) =>{

                    if (currentKey === 'lesson_'+i) {
                        const isLastLesson = i===lessonsNum-1;
                        const list = <Row key={section.id}>
                            <Col xs={24}>
                                <PlanLesson isBuilderMode={isBuilderMode} isPreviewMode={isPreviewMode} planId={planId} upid={upid} item={section} isLastLesson={isLastLesson} haveSections={activitiesNum > 0} showNextLesson={this.showNextLesson} showFirstSection={this.showFirstSection} />
                            </Col>
                        </Row>;

                        return list;
                    }
                    return null;
                })}

                {activitiesNum > 0 && activities.map((section, i) => {

                    if (currentKey === 'section_'+i) {
                        const isLastSection = i===activitiesNum-1;
                        const list = <Row key={section.id}>
                            <Col xs={24}>
                                <PlanSection isBuilderMode={isBuilderMode} isPreviewMode={isPreviewMode}  planId={planId}  upid={upid} date={date} item={section} isLastSection={isLastSection} showNextSection={this.showNextSection} />
                            </Col>
                        </Row>;

                        return list;
                    }
                    return null;
                })}

                {showEmptyBlock && <div className="empty-builder-text">Please add Introduction and Lesson or Activity</div>}
            </Col>
        </Row>)
    }
}



export default PlanBody
