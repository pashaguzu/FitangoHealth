import React from 'react';
import { Row, Col,Layout, Menu, Icon, Divider, Alert, Button, Dropdown } from 'antd';
import {NavLink} from 'react-router-dom';
import {compose, withState, withHandlers, withStateHandlers} from 'recompose';
import Avatar from '../../../User/components/Avatar/index';
import ProfileContent from './components/ProfileContent';
import {PageHeaderLayout} from "../../../../components/Layout/PageHeaderLayout/index";
import {withModal} from "../../../../components/Modal/index"
import {AvatarWithName} from "../../../User/components/AvatarWithName/index";
import DescriptionList from "../../../../components/Layout/DescriptionList/DescriptionList";
import ProfileManager from './containers/ProfileManager';
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
const Description = DescriptionList.Description;
const ButtonGroup = Button.Group;

const CancerTitlePure = ({cancer, openEditorModal, hideEditorModal, openEditor}) => {
    return <React.Fragment>
        <a onClick={openEditorModal}>{cancer.title}</a>
        {openEditor &&  <ProfileManager onHide={hideEditorModal} cancer={cancer} />}
    </React.Fragment>
}
const enhanceTitle = compose(
    withStateHandlers(
        (props) => ({
        openEditor: false,
        }),
        {
            openEditorModal: ({ counter }) => (value) => ({
                openEditor: true
            }),
            hideEditorModal: ({ counter }) => (value) => ({
                openEditor: false
            }),
        }
        )
);

const CancerTitle = enhanceTitle(CancerTitlePure);
 const menu = (
            <Menu>
                <Menu.Item key="1">Suspend</Menu.Item>
                <Menu.Item key="2">Delete</Menu.Item>
            </Menu>
        );
        const tabList = [
            {
                key: 'dashboard',
                tab: 'Overview',
            },
            {
                key: 'timeline',
                tab: 'Timeline',
            },
            {
                key: 'alerts',
                tab: 'Alerts',
            },
            {
                key: 'plans',
                tab: 'Plans',
            },

            {
                key: 'details',
                tab: 'Details',
            },
            {
                key: 'stakeholders',
                tab: 'Stakeholders',
            },
        ];
const Profile = props => {

   

        const {match, loading, user={},addCancer,hideManager,openManage,handleTabChange, fullName} = props;

        const {id, tab = 'dashboard', subtab = ''} = match.params;

        const selectedItem = subtab || tab;
        const openItem = tab;

        let mainUrl = '/u';
        if (id !== '') {
            mainUrl += '/'+id;
        }
        let cancerName = 'Small Cell Lung Cancer';
        let stageName = 'T1 N2 M0 Stage 1';

       

        

        const {genderText, age, email, birthday='', phoneFormatted, addressText, getUserNetwork={}, getAdherence={}, getInsurance={}, getDiagnosis={}} = user;
        //
        const {lastLogin, joinedDate} = getUserNetwork;

        const {memberId = '',
            groupNumber = '',
            payer = {}} = getInsurance;
        const {name:payerName=''} = payer;

        const {code={}} = getDiagnosis;
        const {name:DiagnosisName} = code;

        const descriptionDetails = [
            //['Name', user.fullName],
            ['Member ID', memberId],
            ['Gender', genderText],
            ['Age', age],
            //['Birthday', birthday],
            ['Phone', phoneFormatted],
            //['Email', email],
            ['Diagnosis', (DiagnosisName || null/*<span>Add Diagnosis</span>*/)],
            ['Cancer', cancerName],
            ['Stage', stageName],
            ['Last Login', lastLogin],
            //['Group', groupNumber],
            ['Insurance', payerName]
        ];


        return (
            <PageHeaderLayout
                title={user.fullName}
                content={<Row style={{padding:5}}>
                    <Col md={6}><Avatar info={user} size="huge" /></Col>
                    <Col md={18}>
                        <DescriptionList col={3} >
                            {descriptionDetails.map((details, i) => {
                                return  <Description term={details[0]} excludeEmpty >
                                    {details[1]}
                                </Description>;
                            })}
                        </DescriptionList>
                    </Col>
                </Row>}
                action={<React.Fragment>
                    <ButtonGroup>
                        <Button icon={'edit'} onClick={addCancer}  >Edit Profile</Button>
                        <Dropdown overlay={menu} placement="bottomRight">
                            <Button>
                                <Icon type="ellipsis" />
                            </Button>
                        </Dropdown>
                    </ButtonGroup>
                    <Button type="primary" icon={'mail'} style={{ marginLeft: 8}}>Send Message</Button>
                </React.Fragment>}
                tabList={tabList}
                activeTab={tab}
                onTabChange={handleTabChange}
            >
                <ProfileContent {...props} />
                {openManage && <ProfileManager patient={user} onHide={hideManager} />}
            </PageHeaderLayout>
            
            );
    }

    const enhance = compose(
        withState('openManage', 'setOpenManager', false),
        withHandlers({
            addCancer: props => () => {
                props.setOpenManager(true);
            },
            hideManager: props => () => {
                props.setOpenManager(false);
            }
        })
    );
    
export default enhance(Profile);