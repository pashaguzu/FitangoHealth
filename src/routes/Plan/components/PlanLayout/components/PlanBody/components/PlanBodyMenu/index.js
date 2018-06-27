import React from 'react'

import { Menu, Icon } from 'antd';
import { withApollo } from 'react-apollo';
import AddLessonModal from '../../../../../../../Manager/components/Planbuilder/components/BuildBody/containers/AddLessonModal';
import AddSectionModal from '../../../../../../../Manager/components/Planbuilder/components/BuildBody/containers/AddSectionModal';
import gql from 'graphql-tag';
import {GetGlobalLabel} from "../../../../../../../../components/App/app-context";

const SubMenu = Menu.SubMenu;

export class PlanBodyMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: [props.currentTab],
            currentKey: props.currentKey,
            openAddLesson:false,// if to open add lesson modal
            openAddSection:false,// if to open add lesson modal
        };
    };

    static propTypes = {
    };

    static defaultProps = {
        isBuilderMode:false,
        planId: '',
    }

    onOpenChange = (e) => {
        this.setState({currentTab:e});

    }

    hideAddLesson = () => {
        const newKey = this.props.lessons.length+1;
        this.setState({openAddLesson:!this.state.openAddLesson, currentKey:newKey});
    }

    hideAddSection = () => {
        const newKey = this.props.activities.length+1;
        this.setState({openAddSection:!this.state.openAddSection, currentKey:newKey});
    }

    /**
     * Adds new lesson to the list
     */
    appendLesson = () => {
        const {client} = this.props;
        //console.log(this.props);


        this.setState({openAddLesson:true});

/*
        const query = gql`
                query GetPlanTitle($id: Int!) {
                  plan(id: $id) {
                  id
                    lessons {
                        id
                        title
                     }
                  }
                }
              `;

        const data = client.readQuery({
            query: query,
            variables: {
                id: planId
            },
        });

        console.log(data);
        const emptyLesson = [{id:'',title:'',__typename: "PlanBodyLesson"}];

        const newLessons = [...data.plan.lessons, ...emptyLesson];

        //const newData = {...data, ...{account: {...data.account, ...login}}};

        console.log(newLessons);
        client.writeQuery({
            query,
            variables: {
                id: planId
            },
            data: {
                plan: {...data.plan, lessons: newLessons},
                __typename:'Plan'
            },
        });

        const data2 = client.readQuery({
            query: query,
            variables: {
                id: planId
            },
        });

        console.log(data2);*/

/*
        const fragment =  gql`
           fragment PlanLessons on Plan {
             lessons {
                id
                title
             }
           }
         `;
        let planLessons = client.readFragment({
           id: 'Plan:'+planId, // `id` is any id that could be returned by `dataIdFromObject`.
           fragment: fragment,
       });

        const emptyLesson = [{id:'',title:'',  __typename: "PlanBodyLesson"}];
        const lessons =  [...planLessons.lessons,...emptyLesson];
        client.writeFragment({
            id: 'Plan:'+planId, // `id` is any id that could be returned by `dataIdFromObject`.
            fragment: fragment,
            data: {
                lessons:lessons,
                __typename:'Plan'
            },
        });
*/

    }

    appendSection = () => {
        this.setState({openAddSection:true});
    }

    onClick = (e) => {


        switch(e.key) {
            case 'addLesson':
                // append lesson
                this.appendLesson();
                return;
                break;
            case 'addSection':
                //append section
                this.appendSection();
                return;
                break;
        }
        const{onClick} = this.props;

        this.setState({currentKey:e.key});

        onClick(e.key, e.item.props.index, this.state.currentTab);
    }

    componentWillMount() {

            let currentTab = '';
            let currentKey = '';
            let currentKeyI = 0;
        if (this.props.isBuilderMode) {
            currentTab = 'introduction';
            currentKey = 'introduction';
        }

            // check what should we open
            const{onClick, activities, lessons} = this.props;
            let foundMatch = false;
            if (lessons.length > 0) {
                //if (activities.length === 0) {
                currentTab = 'lessons';
                currentKey = 'lesson_0';
                //}
                // check on incompleted lessons

                lessons.map((lesson, i) => {
                    if (!foundMatch && currentKey === 'lesson_0' && !lesson.completed) {
                        currentTab = 'lessons';
                        currentKey = 'lesson_'+i;
                        currentKeyI = i;
                        foundMatch = true;
                        return false;
                    }
                    return lesson;
                })
            }
            if (!foundMatch && activities.length > 0) {
                currentTab = 'activities';
                currentKey = 'section_0';
                // check on incompleted sections
                activities.map((section, i) => {
                    if (!foundMatch && currentKey === 'section_0' && !section.completed) {

                        currentTab = 'activities';
                        currentKey = 'section_'+i;
                        currentKeyI = i;
                        foundMatch = true;
                        return false;
                    }
                    return section;
                })
            }
            //console.log(currentTab);
            if (currentTab !== '') {
                this.setState({
                    currentTab: [currentTab],
                    currentKey: currentKey,
                    currentKeyI: currentKeyI
                });
                onClick(currentKey, currentKeyI, currentTab);
            }
    };

    componentWillReceiveProps(nextProps) {

        if (nextProps.currentKey !== this.state.currentKey) {
            this.setState({
                currentKey:nextProps.currentKey
            });
        }

        if (nextProps.currentTab !== this.state.currentTab) {
            this.setState({
                currentTab:[nextProps.currentTab]
            });
        }


    }

    render() {

        const {lessons, activities, isBuilderMode, isPreviewMode, planId} = this.props;
        let {currentTab, currentKey} = this.state;

        return (
            <React.Fragment><Menu
            onOpenChange={this.onOpenChange}
            onClick={this.onClick}
            selectedKeys={[currentKey]}
            openKeys={currentTab}
            mode="inline"
        >
            {isBuilderMode && <Menu.Item key='introduction' style={{marginBottom:0}} > <Icon type="exclamation-circle-o" />Introduction</Menu.Item>}
            {(isBuilderMode || lessons.length > 0) && <SubMenu key="lessons" title={<span><Icon type="info-circle-o" /><GetGlobalLabel  type="lessons" /></span>}>
                {lessons.map((lesson, i) => (<Menu.Item key={'lesson_'+i} i={i}>{lesson.completed ? <Icon type="check-circle" /> : <Icon type="check-circle-o" />}{lesson.title}</Menu.Item>))}
                {isBuilderMode && !isPreviewMode && <Menu.Item key='addLesson' style={{marginBottom:0}} > <Icon type="plus" />Add <GetGlobalLabel type="lesson" /></Menu.Item>}
            </SubMenu>}
            {(isBuilderMode || activities.length > 0) && <SubMenu key="activities" title={<span><Icon type="form" /><GetGlobalLabel  type="activities" /></span>}>
                {activities.map((section, i) => (<Menu.Item key={'section_'+i}>{section.completed ? <Icon type="check-circle" /> : <Icon type="check-circle-o" />}{section.title}</Menu.Item>))}
                {isBuilderMode && !isPreviewMode && <Menu.Item key='addSection' style={{marginBottom:0}} > <Icon type="plus" />Add <GetGlobalLabel type="activity" /></Menu.Item>}
                </SubMenu>}
        </Menu>
                {this.state.openAddLesson && <AddLessonModal planId={planId} onHide={this.hideAddLesson} />}
                {this.state.openAddSection && <AddSectionModal planId={planId} onHide={this.hideAddSection} />}
            </React.Fragment>)
    }
}



export default withApollo(PlanBodyMenu)
