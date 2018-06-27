import React from 'react';
import {Form, Select,Card,  Button, Row, Col, Alert, Popover, Icon} from 'antd';
import {withApollo} from 'react-apollo';
import gql from 'graphql-tag';
import {injectIntl} from 'react-intl';
import { compose, withHandlers, withState, withProps, branch, renderComponent} from 'recompose';
import {ElementCalculatorFragment, ElementTrackerFragment, ElementTrackerReportFragment} from "../../fragments";
import TrackersReportModal from '../../../../components/Tracker/containers/TrackersReportModal.js'
import{replaceArray} from "../../../PlanLayout/components/PlanElementBuilder/components/CalculatorElementBuilder/components/CalculatorTest/index";
import messages from './messages';

const FormItem = Form.Item;
const Option = Select.Option;


const formItemLayoutDefault = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

export const prepareInput = (values) => {
    //const {t,n,m, stage} = values;
    return {
        calculatorElement: {
            values
        }
    }
}


const CalculatorElementResultLinePure = ({amid, userId, tracker, openReport, i, showNumbers=false}) => {
    return (<Row>
        <Col>{showNumbers && (i+1)+'. '}{tracker.label}</Col>
    </Row>);
}



const CalculatorElementResultPure = ({element, planId, date, userId, resultInfo: {value, formula, missingTrackers=[]}, openReport=false, toggleReport}) => {
    if (value) {
        return (
            <Row gutter={16}>
                <Col lg={12}>
                    <Alert
                        message={element.title}
                        description={value}
                        type="success"
                        showIcon
                    />
                </Col>
                <Col lg={12}>
                    <Alert
                        message="Formula"
                        description={element.title+'='+formula}
                        type="info"
                        showIcon
                    />
                </Col>
            </Row>
        )//'Calculated value:'+ + '('+formula+')';
    } else {
        if (openReport) {
            return <TrackersReportModal trackers={missingTrackers} date={date} userId={userId} planId={planId} onHide={toggleReport} />
        }
        const missingBlock = missingTrackers.map((tracker, i) => {
            return <CalculatorElementResultLinePure key={i} i={i} tracker={tracker} showNumbers={missingTrackers.length > 1} userId={userId} />;
        })
        return <Alert

            message="Missing values for trackers:"
            description={<div >{missingBlock} <div style={{marginTop:10}}><Button size="small" ghost type="primary" onClick={toggleReport}>Report on missing trackers</Button></div></div>}
            type="error"
            showIcon
        />;

    }
}

const CalculatorElementResult = compose(
    withState('openReport', 'setReport', false),
    withHandlers({
        toggleReport: props => value => {
            //console.log(props.openReport);
            props.setReport(!props.openReport);
            if (props.openReport) {
                console.log(props);
                props.onCalculate();
            }
        }
    })
)(CalculatorElementResultPure);




const CalculatorElement = (props) => {
    const { userId, planId, date, loading, intl, element, onCalculate, resultView, resultInfo={}, isBuilderMode=false} = props;

    const {title = '', formulaString, tokens=[]} = element;

    let find = [];
    let replace = [];
    let replaceValue = [];
    const trackersSource = tokens.map((tracker, i) => {
        //console.log(tracker);
        const {label=''} = tracker;
        const code = label.split(' ').join('_');
        find.push('@'+code);
        replace.push(tracker.label);

       // const value = trackerValues[i] || '';
        //if (value && value !== '')
         //   replaceValue.push(value);

        return {...tracker, key:tracker.id, i};
    });

    const content = (
        <div>
            {tokens.map(tracker => {
                const {getLastReport={}} = tracker;
                const value = getLastReport && getLastReport.value || 'N/A';
                return <Row key={tracker.id}>
                    <Col sm={12}>{tracker.label}</Col>
                    <Col sm={12}>{value}</Col>
                </Row>;
            })}
        </div>
    );

    const formulaFormatted = replaceArray(formulaString, find, replace);
    return (
        <Card title={title+'='+formulaFormatted} loading={loading} hoverable extra={!isBuilderMode && <Popover content={content} title="Trackers" trigger="hover">
            <Icon type="info-circle-o" /></Popover>} >
            {resultView ?
                <CalculatorElementResult userId={userId} date={date} planId={planId} element={element} resultInfo={resultInfo} onCalculate={onCalculate} />
                :
                <div style={{textAlign:'center', marginTop:10}}><Button type="primary" disabled={isBuilderMode} onClick={onCalculate}>Calculate</Button></div>
            }
        </Card>
    );
}


const CalculateQuery = gql`
    query GET_CALCULATOR_RESULT ($planId: UID!, $id: UID!, $date: Date) {
        plan (id:$planId) {
            id
            getElement (id: $id) {
                id
                itemInfo {
                    ... on PlanElementCalculator {
                        ...CalculatorElement
                        getCalculation (date:$date) {
                            value
                            formula
                            missingTrackers {
                                ...TrackerElement 
                                getLastReport {
                                    ...TrackerReportFields
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    
    ${ElementTrackerFragment}
    ${ElementTrackerReportFragment}
    ${ElementCalculatorFragment}
`;

const calculateQueryOptions = {
    query: CalculateQuery,
    fetchPolicy: 'network-only'
}
const enhance = compose(
    injectIntl,
    withApollo,
    Form.create(),
    withState('loading', 'setLoading', false),
    withState('resultView', 'openResult', false),
    withState('resultInfo', 'setResultInfo', false),
    withHandlers({
        onCalculate: props => value => {
            // calculate
            //props.openResult(true);
            //console.log(props);

            calculateQueryOptions.variables = {
                planId:props.planId,
                id:props.actFieldId,
                date:props.date,
                //id: targetOption.value
            };
            props.setLoading(true);
            props.client.query(calculateQueryOptions).then(({loading, data}) => {
                if (!loading) {
                    props.setLoading(false);
                    const {plan: {getElement: {itemInfo: {getCalculation}}}} = data;
                    // do smth
                    props.setResultInfo(getCalculation);
                    props.openResult(true);
                }
            });
        }
    })
)



export default enhance(CalculatorElement);

