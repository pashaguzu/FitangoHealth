import React from 'react';
import {Row, Col, Card, Steps, Tooltip, Popover} from 'antd';
import {compose, withState, lifecycle, withProps} from 'recompose';
import moment from 'moment';
const Step = Steps.Step;

export const Vitals = props => {
    const {stages=[], patientStages=[]} = props;
    if (stages.length === 0) {
        return null;
    }
    let currentStep = 0;
    let finalStages = stages.map((stage, i) => {
        let userStage = false;
        const {isTimestamp} = stage;
        //patientStages
        userStage = patientStages.filter((patientStage, i) => {
            const {stage:details} = patientStage;
            const {id} = details;
            if (patientStage.isCurrent) {
                currentStep = i;
            }
            return id === stage.id;
        });
        if (userStage.length > 0) {
            userStage = userStage[0];
        } else {
            userStage = null;
        }

        return {...stage, report:userStage };
    });
    //console.log(props);
    return  <Row  style={{marginBottom:16}}>
        <Col><Card title={'Stages'}>
        <Steps progressDot={true} current={currentStep} >
            {finalStages.map((stage, i) => {

                let {title, description, report, isTimestamp, isDatestamp} = stage;
                // search for the proper stage
                if (report) {
                    const {isCurrent} = report;
                    const reportTime = moment(report.startDate);
                    if (isTimestamp) {
                        description = <Tooltip title={reportTime.format('LLL')} >{reportTime.format('LT')}</Tooltip>;
                    } else if (isDatestamp) {
                        description = <Tooltip title={reportTime.format('LLL')} >{reportTime.format('L')}</Tooltip>;
                    } else {
                        // get previous entry
                        if (i>0 && finalStages[i-1]) {
                            const prevStage = finalStages[i-1];
                            const {report:prevReport} = prevStage;
                            if (prevReport) {
                                // find next result
                                let newTime = '';
                                // if we have prev report - compare
                                const prevReportTime = moment(prevReport.startDate);

                                if (isCurrent) {
                                    newTime = <StepsCounter time={reportTime} />;
                                } else {
                                    if (finalStages[i+1]) {

                                        const nextStage = finalStages[i + 1];
                                        const {report:nextReport} = nextStage;
                                        if (nextReport) {

                                            const nextReportTime = moment(nextReport.startDate);
                                            console.log(nextReportTime, 'nextReport')
                                            console.log(reportTime, 'nextReport')
                                            newTime = nextReportTime.to(reportTime, true);
                                        } else {
                                            newTime = reportTime.from(prevReportTime, true);
                                        }

                                    } else {
                                        // is last
                                        newTime = reportTime.format('LLL');
                                    }
                                }
                                //const newTime = isCurrent ? <StepsCounter time={reportTime} /> :  ;
                                //moment(report.startDate).format('LT');reportTime
                                // find time difference
                                description = <Tooltip title={reportTime.format('LLL')} >{newTime}</Tooltip>;
                            }
                        } else {
                            description = 'unknowm';
                        }

                    }
                }

                console.log(stage);
                return <Step title={title} description={<center>{description}</center>} />
                //return <StepWithCounter stage={stage} finalStages={finalStages} key={i} i={i} />
            })}
        </Steps>
        </Card></Col></Row>;
}

export default Vitals;

const customDot = (dot, { status, index }) => (
    <Popover content={<span>step {index} status: {status}</span>}>
        {dot}
    </Popover>
);

const StepWithCounter = props => {
    const {stage, i, finalStages=[]} = props;

    let {title, description, report, isTimestamp, isDatestamp} = stage;
    // search for the proper stage
    if (report) {
        const reportTime = moment(report.startDate);
        if (isTimestamp) {
            description = reportTime.format('LT');
        } else if (isDatestamp) {
            description = reportTime.format('L');
        } else {
            // get previous entry
            if (i>0 && finalStages[i-1]) {
                const prevStage = finalStages[i-1];
                const {report:prevReport} = prevStage;
                if (prevReport) {
                    // if we have prev report - compare
                    const prevReportTime = moment(prevReport.startDate);
                    const newTime = prevReportTime.from(reportTime);
                    //moment(report.startDate).format('LT');reportTime
                    // find time difference
                    description = newTime;
                }
            } else {
                description = 'unknowm';
            }

        }
    }

    console.log(stage);
    return <Step title={title} description={description} />
}

const StepsCounterPure = props => {
    const {counter} = props;
    const duration = moment.duration(counter);
    return formatDuration(duration);//moment(counter).calendar();
}

const formatDuration = duration => {
    let years = duration.years(),
        months = duration.months(),
        days = duration.days(),
        hrs = duration.hours(),
        mins = duration.minutes(),
        secs = duration.seconds();

    let string = '';

    if (years > 0) {
        string += years+'y ';
    }
    if (months > 0) {
        string += months+'m ';
    }
    if (days > 0) {
        string += days+'d ';
    }
    if (hrs > 0) {
        string += hrs+':';
    } else {
        string += '00:';
    }
    if (mins > 0) {
        string += mins+':';
    } else {
        string += '00:';
    }


    return string+secs;
}

const StepsCounter = compose(
    withProps(props => {
        const now = moment();
        return {
            timeDifference: now.diff(props.time)
        }
    }),
    withState('counter', 'setCounter', props => props.timeDifference),
    lifecycle({
        componentDidMount() {
            this.timerID = setInterval(
                () => this.props.setCounter(this.props.counter+1000),
                1000
            );
        },
        componentWillUnmount() {
            clearInterval(this.timerID);
        }
    })
)(StepsCounterPure);