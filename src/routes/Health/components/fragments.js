import gql from 'graphql-tag';
import {ClinicalTrialFragment} from "../../Manager/components/ClinicalTrials/fragments";
import {ElementTreatmentFragment} from "../../Plan/components/Plan/fragments";

export const StringUnitsFragment  = gql`
    fragment StringUnitsInfo on StringUnits {
        value
        units
    }
`;

export const ClinicalTrialElementFragment  = gql`
    fragment ClinicalTrialElementInfo on ClinicalTrialElement {
        id
        trial {
            id
            title
        }
        cohort
        sponsor
    }
`;
export const ICD10Fragment  = gql`
    fragment ICD10Info on Icd10Code {
        id
        code
        name
    }
`;

export const DiagnosisFragment  = gql`
    fragment DiagnosisInfo on Diagnosis {
        id
        code {
            ...ICD10Info
        }
        date
        status
        notes
    }
     ${ICD10Fragment}
`;

export const OncologyFragment  = gql`
    fragment OncologyInfo on Oncology {
        id
        diagnosis {
            ...ICD10Info
        }
        type
        disorder
        behaviour
        organSystem
        anatomicSite
    }
    ${ICD10Fragment}
`;

export const RadiationFragment  = gql`
    fragment RadiationInfo on Radiation {
        id
        treatmentAnatomicSite
        treatmentTechnique
        regionalModality
        regionalDose {
            ...StringUnitsInfo
        }
        regionalFractions
    }
    ${StringUnitsFragment}
`;

export const RadiologyFragment  = gql`
    fragment RadiologyInfo on Radiology {
        id
        CPTcode
        tumorSize {
            ...StringUnitsInfo
        }
        regionalLymphNodes
        metastaticSites
    }
     ${StringUnitsFragment}
`;

export const PathologyFragment  = gql`
    fragment PathologyInfo on Pathology {
        id
        tumorHistology
        tumorBehavior
        tumorGrade
        tumorSize {
            ...StringUnitsInfo
        }
    }
     ${StringUnitsFragment}
`;

export const HealthElementFragment  = gql`
    fragment HealthElement on HealthRecord {
        id
        type
        title
        isActive
        typeText
        riskLevel
        isPrimary
        details {
            ... on Diagnosis {
                ...DiagnosisInfo
            }
             ... on ClinicalTrialElement {
              ...ClinicalTrialElementInfo
            }
            ... on Treatment {
              ...TreatmentPlanElement
            }
            ... on Oncology {
              ...OncologyInfo
            }
            ... on Radiation {
              ...RadiationInfo
            }
            ... on Radiology {
              ...RadiologyInfo
            }
            ... on Pathology {
              ...PathologyInfo
            }
       }
       createdDate
    }
    
    ${ElementTreatmentFragment}
    ${OncologyFragment}
    ${DiagnosisFragment}
    ${RadiationFragment}
    ${RadiologyFragment}
    ${PathologyFragment}
    ${ClinicalTrialElementFragment}
`;


