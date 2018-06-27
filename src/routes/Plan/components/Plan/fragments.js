import gql from 'graphql-tag';
import {TreatmentElementFragment} from "./components/TreatmentElement/components/fragments";

export const PlanCardFragment = gql`
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
`;

export const UserPlanFragment = gql`
    fragment UserPlanInfo on UserPlan {
            id
            plan {
                ...PlanCardInfo
            }
    }
        
    ${PlanCardFragment}
`;

export const PathwayCardFragment = gql`
        fragment PathwayCardInfo on Pathway {
            id,
            title,
            description
            version
        }
`;


export const FieldReportFragment = gql`
    fragment FieldReportInfo on FieldReport {
        id
        fieldId
        fieldType
        value
    }
`;




export const ElementLinkFragment = gql`
    fragment LinkElement on PlanElementLink {
        id
        label
        url
        description

}
`;

export const ElementTextFragment = gql`
    fragment TextElement on PlanElementText {
        id
        text
        icon
    }
`;

export const ElementClinicalNoteFragment = gql`
    fragment ClinicalNoteElement on PlanElementClinicalNote {
        id
        title
        note
        attachments {
            id
            type
            label
            url
            size
        }
    }
`;

export const ElementOptionsFragment = gql`
    fragment OptionsElement on PlanElementChecklist {
          id
          label
          isVertical
          options {
            value
            label
          }
    }
`;

export const ElementScaleFragment = gql`
    fragment ScaleElement on PlanElementScale {
          id
          label
          scaleId
          options {
            value
            label
          }
    }
`;

export const ElementMediaFragment = gql`
    fragment MediaElement on PlanElementMedia {
        id
        label
        description
        mediaType:type
        mediaType:type
        source
        url
        embedHtml
        filename
        filesize
    }
`;

export const ElementApFragment = gql`
    fragment ApPlanElement on Plan {
        id
        title
    }
`;



export const TreatmentBlockElementFragment = gql`
    fragment TreatmentBlockElement on TreatmentBlockElement {
        ... on PlanElementText {
          ...TextElement
        }
        ... on PlanElementLink {
          ...LinkElement
        }
    }
     ${ElementLinkFragment}
     ${ElementTextFragment}
`;

export const ElementTreatmentFragment = gql`
    fragment TreatmentPlanElement on Treatment {
          id
          title
          elements {
                ...TreatmentElement
          }
    }
   ${TreatmentElementFragment}
`;



export const ElementTrackerReportFragment = gql`
    fragment TrackerReportFields on TrackerReport {
            id
            time,
            date
            reportKey
            columnId
            isCritical
            value
            comments
    }
`;




export const ElementTrackerFragment = gql`
    fragment TrackerElement on Tracker {
        id
        label
        textBefore
        description
        graph
        allowMultipleReports
        parentId
        units {
            id
            name
        }
        inputMask
       
        targets {
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
        isGlobal
        isCritical
    }
`;
/*
 targets (date:$date) @include(if: $date) {
            id
            title
            value
        }
 */

export const ElementCalculatorFragment = gql`
    fragment CalculatorElement on PlanElementCalculator {
        id
        title
        formulaString
        tokens {
           ...TrackerElement 
           getLastReport {
                ...TrackerReportFields
           }
        }
    }
    ${ElementTrackerReportFragment}
    ${ElementTrackerFragment}
`;



export const ElementAliasFragment = gql`
    fragment AliasPlanElement on PlanElementAlias {
        id
        label
        btnLabel
        hasElement
    }
   ${TreatmentElementFragment}
   ${ElementApFragment}
   ${ElementTrackerFragment}
`;
/*
 ${TreatmentBlockElementFragment}
element {
                    ...TreatmentBlockElement
                }
 */


export const PlanElementFragment = gql`
            fragment PlanElement on PlanBodyElement {
            id
            itemId
            itemType
            type
            typeText
            hasChildren
            reports (date: $date) {
                id
                value,
                date
            }
            footnote
            reference
            itemInfo {
               
                ... on PlanElementChecklist {
                  ...OptionsElement
                }
                ... on PlanElementScale {
                  ...ScaleElement
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
                  ...TextElement
                }
                  ... on PlanElementClinicalNote {
                  ...ClinicalNoteElement
                }
                
                ... on PlanElementLink {
                  ...LinkElement
                }
                
                 ... on Tracker {
                    ...TrackerElement
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
                    ...MediaElement
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
                
                ... on Treatment {
                    ...TreatmentPlanElement
                }
                ... on Plan {
                    ... ApPlanElement
                }
                 ... on PlanElementCalculator {
                    ...CalculatorElement
                }
            }
             
        }
         ${ElementMediaFragment}
         ${ElementLinkFragment}
         ${ElementTextFragment}
         ${ElementClinicalNoteFragment}
         ${ElementOptionsFragment}
         ${ElementScaleFragment}
         ${ElementTreatmentFragment}
         ${ElementApFragment}
          ${ElementTrackerFragment}
          ${ElementCalculatorFragment}
`;

export const PlanElementPureFragment = gql`
            fragment PlanElement on PlanBodyElement {
            id
            itemId
            itemType
            type
            typeText
            hasChildren
            schedule {
                type
                startDate
                endDate
                relativeStartDate
                relativeEndDate
                dows
                specificDays
                specificDates
            }
            footnote
            reference
            itemInfo {
               
                ... on PlanElementChecklist {
                  ...OptionsElement
                }
                ... on PlanElementScale {
                  ...ScaleElement
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
                  ...TextElement
                }
                
                 ... on PlanElementClinicalNote {
                  ...ClinicalNoteElement
                }
                
                ... on PlanElementLink {
                    ...LinkElement
                }
                
                 ... on Tracker {
                     ...TrackerElement
                }
                ... on PlanElementMedia {
                    ...MediaElement
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
                
                ... on Treatment {
                    ...TreatmentPlanElement
                }
                
                ... on PlanElementAlias {
                    ... AliasPlanElement
                    elementRoute
                }
                ... on Plan {
                    ... ApPlanElement
                }
                ... on PlanElementCalculator {
                    ...CalculatorElement
                }
            }
             
        }
        ${ElementMediaFragment}
        ${ElementLinkFragment}
        ${ElementTextFragment}
        ${ElementClinicalNoteFragment}
        ${ElementOptionsFragment}
        ${ElementScaleFragment}
        ${ElementTreatmentFragment}
        ${ElementAliasFragment}
        ${ElementApFragment}
        ${ElementCalculatorFragment}
         ${ElementTrackerFragment}
`;



