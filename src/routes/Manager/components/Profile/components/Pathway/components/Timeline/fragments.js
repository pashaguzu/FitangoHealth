import gql from 'graphql-tag';
import {
    ElementLinkFragment, ElementTextFragment, ElementTreatmentFragment, ElementOptionsFragment,
    ElementClinicalNoteFragment, FieldReportFragment, ElementMediaFragment
} from "../../../../../../../Plan/components/Plan/fragments";
import {HealthElementFragment} from "../../../../../../../Health/components/fragments";
import {TumorboardSimpleFragment} from "../../../../../Tumorboard/containers/TumorboardManager";
import {ClinicalTrialFragment} from "../../../../../ClinicalTrials/fragments";
import {PlanCardFragment, UserPlanFragment} from "../../../../../../../Plan/components/Plan/fragments";
export const TimelineElementActivityFragment  = gql`
    fragment TimelineElementActivity on TimelineElement {
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
            ... on Tumorboard {
                ...TumorboardSimpleInfo
            }
            ... on Plan {
                ...PlanCardInfo
            }
             ... on UserPlan {
                ...UserPlanInfo
            }
            
            ... on PlanElementMedia {
                ...MediaElement
            }
            __typename
        }
    }
     ${ElementLinkFragment}
     ${ElementTextFragment}
     ${ElementClinicalNoteFragment}
     ${ElementTreatmentFragment}
     ${ElementOptionsFragment}
     ${HealthElementFragment}
     ${TumorboardSimpleFragment}
     ${PlanCardFragment}
     ${UserPlanFragment}
     ${ElementMediaFragment}
     
`;

export const TimelineElementFragment = gql`
        fragment TimelineElement on TimelineElement {
          id
          type
          typeText
          ...TimelineElementActivity
          date
          notes
          isCritical
          createdAt
          creator {
            id,
            fullName
          }
          source,
          getReport {
            ...FieldReportInfo
          }
        }
        ${TimelineElementActivityFragment}
        ${FieldReportFragment}
    `;

