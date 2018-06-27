import gql from 'graphql-tag';
import {UserInfoFragment} from "../../../User/fragments";
import {ElementLinkFragment, ElementTextFragment, ElementTreatmentFragment, ElementOptionsFragment,
    ElementClinicalNoteFragment} from "../../../Plan/components/Plan/fragments";
import {HealthElementFragment} from "../../../Health/components/fragments";


export const TumorboardElementFragment  = gql`
    fragment TumorboardElementInfo on TumorboardElement {
        id
        activity {
            ... on TimelineElementBasic {
              id
              text
              __typename
            }
            ... on PlanElementLink {
              ...LinkElement
            }
            ... on PlanElementText {
              ...TextElement
            }
             ... on PlanElementClinicalNote {
              ...ClinicalNoteElement
            }
            ... on Treatment {
                ...TreatmentPlanElement
            }
            ... on PlanElementChecklist {
                  ...OptionsElement
            }
            ... on HealthRecord {
                  ...HealthElement
                  
            }
         }
         type 
         typeText  
         notes
         __typename
    }
     ${ElementLinkFragment}
     ${ElementTextFragment}
     ${ElementClinicalNoteFragment}
     ${ElementTreatmentFragment}
     ${ElementOptionsFragment}
     ${HealthElementFragment}
`;

export const TumorboardSimpleFragment = gql`
        fragment TumorboardSimpleInfo on Tumorboard {
            id,
            title,
            lead {
                ...UserInfo
            }
            admin {
                ...UserInfo
            }
            location
            video
            notes
            startDate
            endDate
            startTime
            endTime
            isOpen
        }
        ${UserInfoFragment}
`;
export const TumorboardCaseFragment = gql`
        fragment TumorboardCaseInfo on TumorboardCase {
            id
            patient {
                id
                age
                genderText
            }
            elements {
                ...TumorboardElementInfo
            }
        }
        ${TumorboardElementFragment}
`;

export const TumorboardFragment = gql`
        fragment TumorboardInfo on Tumorboard {
            ...TumorboardSimpleInfo
            getCases {
                ...TumorboardCaseInfo
            }
            participants {
                id
                user {
                    ...UserInfo
                }
            }
        }
        ${TumorboardSimpleFragment}
        ${TumorboardCaseFragment}
        ${UserInfoFragment}
`;

