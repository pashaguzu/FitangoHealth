import React from 'react';
import {Row, Col, Tabs} from 'antd';
import moment from 'moment';
import {withStateHandlers} from 'recompose';


export const TumorboardView = props => {
    const {clinicalTrial={}} = props;
    const {
        title,
        nctId,
        orgStudyId,
        secondaryId,
        sponsorAgency,
        source,
        briefSummary,
        detailedDescription,
        status,
        phase,
        studyType,
        studyInterventionModel,
        studyPrimaryPurpose,
        studyMasking,
        condition,
        interventionType,
        interventionName,
        criteria,
        gender,
        minAge,
        maxAge,
        healthyVolunteers,
        facilityName,
        address,
        locationCountries,
        verificationDate,
        studyFirstSubmitted,
        studyFirstSubmittedQc,
        studyFirstPosted,
        lastUpdateSubmitted,
        lastUpdateSubmittedQc,
        cbComment,
        lastUpdatePosted,
        cbMeshTerm,
        ibComment,
        ibMeshTerm} = clinicalTrial;

    let items = [
        ['Title', title],
        ['NCT number', nctId],
        ['Org Study number', orgStudyId],
        ['Secondary ID', secondaryId],
        ['Study Sponsor', sponsorAgency],
        ['Brief Summary', briefSummary],
        ['Detailed Description', detailedDescription],
        ['Source', source],
        ['status', status],
        ['Study Type', studyType],
        ['Study Phase', phase],
        ['Study Design', [['Intervention Model', studyInterventionModel], ['Masking', studyMasking], ['Primary Purpose', studyPrimaryPurpose]]],
        ['Condition', condition],
        ['Intervention', interventionType+': '+interventionName],
        ['Eligibility Criteria ', criteria],
        ['Sex/Gender', gender],
        ['Ages', minAge+'-'+maxAge],
        ['Accepts Healthy Volunteers', healthyVolunteers],
        ['Facility Name', facilityName],
        ['Verification Date', moment(verificationDate).format('L')],

        ['First Submitted Date', moment(studyFirstSubmitted).format('L')],
        ['First Posted Date', moment(studyFirstPosted).format('L')],
        ['Last Update Posted Date', moment(lastUpdateSubmitted).format('L')],
    ];


    return <table border={1}>{items.map((item, i) => {
        return <tr key={i}><th style={{width:150, verticalAlign:'top'}}>{item[0]}</th><td>{item[1]}</td></tr>

    })} </table>;
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