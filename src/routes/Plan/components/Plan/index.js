import React from 'react';
import { Row, Col,Tag,Card, Tooltip } from 'antd';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
//import PropType from 'prop-types'
import './styles.less';

export class Plan extends React.PureComponent {
  // fragment for the plan info
  static fragments = {
    plan: gql`
        fragment PlanCardInfo on Plan {
            id,
            title,
            description,
            thumb {
                small,
                medium,
                large,
                wide
            }
        }
    `,
      element: gql`
        fragment PlanElement on PlanBodyElement {
            id
            itemId
            itemType
            type
            reports (date: $date) {
                id
                value,
                date
           }
            itemInfo {
               
                ... on PlanElementChecklist {
                  id
                  label
                  isVertical
                  options {
                    value
                    label
                  }
                }
                ... on PlanElementRadio {
                  id
                  label
                  isVertical
                  options {
                    value
                    label
                  }
                }
                ... on PlanElementTextInput {
                  id
                  label
                  isLong
                  isDate
                  isTime
                }
                
                ... on PlanElementText {
                  id
                  text
                }
                ... on PlanElementLink {
                  id
                  label
                  url
                  description
                }
                
                 ... on Tracker {
                    id
                    label
                    textBefore
                    description
                    graph
                    allowMultipleReports
                    units {
                        id
                        name
                    }
                    inputMask
                    targets (date: $date){
                        id
                        title
                        value
                    }
                    criticalRange {
                        min
                        max
                    }
                    normalRange {
                        min
                        max
                    }
                    
                    reports (date: $date){
                        id
                        time,
                        date
                        reportKey
                        columnId
                        isCritical
                        value
                        comments
                    }
                }
                ... on PlanElementMedia {
                    id
                    label
                    description
                    type
                    source
                    url
                    embedHtml
                }
                ... on PlanElementLine {
                    id
                    height
                    color
                }
                
                 ... on Assessment {
                    id
                    name
                }
            }
             
        }
    `
  }


  static defaultProps = {
      list:false
  }
  static propTypes = {
    //plan: propType(Plan.fragments.plan).isRequired,
    //handleCancel: React.PropTypes.func.isRequired,
  }

  render() {

    const list = this.props.list;
    var name = this.props.info.title;
    let description = this.props.info.description;
    var img = this.props.info.thumb.large;
    var id = this.props.info.id;
    var upid = this.props.upid || '';
    var ribbon = this.props.info.ribbon || '';

    let link = '/planstore/plan/'+id;
    const is_user = upid !== '';
    // if the link is personal - then open user link
     // let height = 154;
      //let limit = 25;
      if (is_user) {
          link = '/plan/'+upid;
          //description = '';
         // height = 120;
          //limit = 15;
      }

      if (list) {
          return (
              <Link style={{width:'100%'}}
                  to={link}
              >
                  <Row>
                      <Col span={5}><div> {ribbon && <Tag color="magenta" style={{position:'absolute', top:10, right:0}}>{ribbon}</Tag>}<img alt={name} width={'100%'}  src={img} /></div></Col>
                      <Col offset={1} span={18}>{name}</Col>
                  </Row>
              </Link>
          );
      }
      //description = '//return (<div>aaa</div>); //handleCancel: React.PropTypes.func.isRequired';
    return (
        <Link
          to={link}
        >
            <Card
                cover={<div> {ribbon && <Tag color="magenta" style={{position:'absolute', top:10, right:0}}>{ribbon}</Tag>}<img alt={name} style={{maxHeight:154}} width={'100%'} src={img} /></div>}
                hoverable={true}
                type='plan'
            >

                <Card.Meta
                    title={<Tooltip title={name}><Truncate lines={2}>{name}</Truncate></Tooltip>}
                    description={<Truncate lines={2}>{description}</Truncate>}
                />


            </Card>
        </Link>
    );
  }
}

export default Plan;