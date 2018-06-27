import gql from 'graphql-tag';

export const TreatmentElementFragment = gql`
        fragment TreatmentElement on TreatmentElement {
            id
            type
            description
            notes
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
                    ... on PlanElementChemotherapy {
                        id
                        chemotherapy {
                            id
                            title
                        }
                        cycles
                        days
                        timesPerDay
                    }
                }
            }
             
        }
`;