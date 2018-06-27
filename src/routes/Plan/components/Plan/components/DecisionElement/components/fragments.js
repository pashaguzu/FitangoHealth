import gql from 'graphql-tag';

export const TreatmentElementFragment = gql`
        fragment TreatmentElement on TreatmentBlockElement {
            id
            type
            description
            element {
                id
                info {
                    ... on PlanElementChecklist {
                        id
                        label
                        options {
                        value
                        label
                      }
                    }
                }
            }
             
        }
`;