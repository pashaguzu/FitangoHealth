import React from 'react';
import { Tabs, Card } from 'antd';
import EllipsisText  from 'react-ellipsis-text';
import {withState,withProps, compose, withHandlers} from 'recompose';
import {getTimelineElementCardTitle} from "../TimelineElement/index";
import TimelineElement from '../../containers/TimelineElement';
import PathwayContent from '../../../../containers/PathwayContent';

const TabPane = Tabs.TabPane;


const TimelineElementDetails = ({onChange, onEdit, activeTab, panes, activeElement, userId, showPathway=false}) => {

    const tabTitleLength = panes.length > 3 ? 10 : 20;

    //console.log(activeTab);
    return <div style={{marginLeft:10}}><Tabs
        onChange={onChange}
        onEdit={onEdit}
        activeKey={activeTab || 'item_'+activeElement.id}
        type="editable-card"
        hideAdd
    >
        {panes.map(pane => {
            //console.log(pane.key);
            const tabTitle = <EllipsisText text={pane.title} length={tabTitleLength} />;
            if (pane.key === 'pathway') {
                return <TabPane tab={tabTitle} key={pane.key} closable={pane.closable}>{pane.content}</TabPane>
            }
            return <TabPane tab={tabTitle} key={pane.key} closable={pane.closable}><TimelineElement item={pane.content} userId={userId} getOnlyActivity /></TabPane>;
        })}
    </Tabs></div>
}

const enhance = compose(
    withState('activeTab', 'setActiveTab', props => null),
    withProps(props => {
        const {elements=[], showPathway} = props;
        //console.log(elements);
        let panes = elements.map((el, i) => {
            return { title: getTimelineElementCardTitle(el), content: el, key: 'item_'+el.id }
        });

        if (showPathway) {
            const pathTab = {title: 'Pathway', closable:false, content: <PathwayContent userId={props.userId} pathway={props.pathway} setPathway={props.setPathway} />, key: 'pathway'};
            panes = [pathTab, ...panes];
        }

        return {panes}
    }),

    withHandlers({
        remove: props => (targetKey) => {
            let element = props.activeElement;
            let activeKey = props.activeTab || 'item_'+element.id;

            // if (activeKey === 'pathway') {
            //     props.togglePathway();
            //     return true;
            // }
            let lastIndex;
            props.panes.forEach((pane, i) => {
                if (pane.key === targetKey) {
                    lastIndex = i - 1;
                }
            });
             console.log(props);
            console.log(lastIndex);
            console.log(activeKey);
            console.log(targetKey);
            let newPanes = props.panes.filter(pane => pane.key !== targetKey);
            const oldPanesLength = newPanes.length;
            console.log(newPanes);
            newPanes = newPanes.filter(pane => pane.key !== 'pathway');
            if (oldPanesLength !== newPanes.length) {
                lastIndex--;
            }
            //
            if (newPanes.length > 0) {
                if (lastIndex >= 0 && activeKey === targetKey) {
                    //console.log(newPanes);
                    if (newPanes.length === 1) {
                        lastIndex = 0;
                    }
                    element = newPanes[lastIndex].content;
                }
            } else {
                element = undefined;
            }
            const elements = newPanes.map(pane => {
                return pane.content;
            });
            console.log(elements);
            console.log(element);

            props.updateElements(elements, element);
            //this.setState({ panes:, activeKey });
        }
    }),
    withHandlers({
        onChange: props => (targetKey) => {
            props.setActiveTab(targetKey);
        },
        onEdit: props => (targetKey, action) => {
            props[action](targetKey);
        },
    })
)

export default enhance(TimelineElementDetails);