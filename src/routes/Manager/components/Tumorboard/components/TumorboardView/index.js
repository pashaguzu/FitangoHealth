import React from 'react';
import {Modal, Row, Col, Tabs, Card, Alert, Button} from 'antd';
import moment from 'moment';
import {AvatarWithName} from "../../../../../User/components/AvatarWithName/index";
import {Comments} from "../../../../../../components/Comments/index";
import {compose,withStateHandlers, withHandlers, withState} from 'recompose';
import {TumorboardElements} from "./components/TumorboardElements/index";
import TumorboardNextSteps from "./components/TumorboardNextSteps/index";
import {Options} from "../../../../../../components/FormCustomFields/components/Options/index";
import TumorboardCase, {deIdentifiedPatient} from "./components/TumorboardCases/components/TumorboardCase/index";
import {EmptyList} from "../../../../../../components/Loading/index";

const TabPane = Tabs.TabPane;



const TumorCaseCardPure = props => {
    const {tumorCase, showModal, i, tumorboard} = props;
    const {patient} = tumorCase;
    const title = deIdentifiedPatient({patient, index:i+1});
    return <Card hoverable onClick={props.toggleModal}>{title}
        {showModal && <Modal
            title={title}
            visible={true}
            footer={<Button type="primary" onClick={this.toggleModal}>Close</Button>}
        >
            {tumorCase.elements.length > 0 ?
                <TumorboardElements tumorboard={tumorboard} elements={tumorCase.elements} editable={false} />
                : <EmptyList>No Details</EmptyList>}
        </Modal>}
    </Card>;
}

const TumorCaseCard = compose(
    withState('showModal', 'setShowModal', false),
    withHandlers({
        toggleModal: props => () => {
            props.setShowModal(!props.showModal);
        }
    })
)(TumorCaseCardPure);

export const TumorboardView = props => {
    const {tumorboard={}, onTabChange, currentTab='main', loading=false} = props;
    const {id, title='', startTime, endTime, notes='', location='', video='', getCases={}, lead=null, admin=null, elements=[], participants=[], getNewCommentsNumber=0} = tumorboard;
    //const {id:leadUid=''} = lead;
    //const {id:adminUid=''} = admin;
    let userId = '';
    let items = [
        //['Patient', [<AvatarWithName info={patient} key={1} />, <span style={{verticalAlign:'middle'}} key={2}>, {patient.age+', '+patient.genderText}</span>]],
        ['Title', title],
        ['Start Time', moment(startTime).format('LLL')],
    ];
    if (endTime) {
        items.push(['End Time', moment(endTime).format('LLL')]);
    }
    if (lead) {
        items.push(['Lead', <AvatarWithName info={lead} />]);
    }
    if (admin) {
        items.push(['Admin', <AvatarWithName info={admin} />]);
    }

    if (location !== '') {
        items.push(['Location', location]);
    }
    if (video !== '') {
        items.push(['Video', video]);
    }
    if (notes !== '') {
        items.push(['Notes', notes]);
    }

    if (participants.length > 0) {
        items.push(['Participants', participants.map(participant => {
            return <div><AvatarWithName user={participant.user} key={participant.id}/></div>;
        })]);
    } else {
        items.push(['Participants', <Alert message="No Participants" type="warning" />]);
    }
    const mainInfo = items.map((item, i) => {
        return <Row style={{marginBottom:5}} key={i}>
            <Col span={6}>{item[0]}</Col>
            <Col span={18}>{item[1]}</Col>
        </Row>
    });
    const elementsInfo = <TumorboardElements tumorboard={tumorboard} elements={elements} editable={false} userId={userId} loading={loading} />;
    const commentsInfo = <Comments id={id} type="tumorboard" title="Comments" userId={userId} />;

    const nextInfo = <TumorboardNextSteps tumorboard={tumorboard} userId={userId} />;


    return <React.Fragment>
        <div>
        {mainInfo}

        <Row gutter={16} style={{marginTop:16}}
        >
            {getCases.length > 0 ? getCases.map((tumorCase, i) => {
                    return <Col md={6}><TumorCaseCard key={i} tumorCase={tumorCase} i={i}  /></Col>;
                //return <TabPane tab={} key={i}><TumorboardCase tumorboardCase={tumorCase} key={i} index={i+1} /></TabPane>
            }) :

                <EmptyList>No Cases added</EmptyList>}

            {/*<Tabs defaultActiveKey="elementsInfo" size="small" style={{maxWidth:'1050px'}}>*/}
                {/*{getCases.map((tumorCase, i) => {*/}
                    {/*const {patient} = tumorCase;*/}
                    {/*const title = deIdentifiedPatient({patient, index:i+1});*/}
                    {/*return <TabPane tab={title} key={i}><TumorboardCase tumorboardCase={tumorCase} key={i} index={i+1} /></TabPane>*/}
                {/*})}*/}
            {/*</Tabs>*/}
        </Row>
        </div>
    </React.Fragment>
}

export default withStateHandlers(
    ({ initialCounter = 0 }) => ({
        currentTab: 'main',
    }),
    {
        onTabChange: ({ currentTab }) => (tab) => ({
            currentTab: tab
        }),
    }
)(TumorboardView);