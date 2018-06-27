import gql from 'graphql-tag';


export const MedicationInfo = gql`
            fragment MedicationInfo on Medication {
                id
                drug {
                    name
                    dosage
                    id
                    form
                }
                type
                timesPerDay
                quantity
                directions
                purpose
                sideEffects
                image
                isPersonal
                startDate
                endDate
            }
            `;
export const MedicationCardInfo = gql`
            fragment MedicationCardInfo on Medication {
                ...MedicationInfo
                reports (date: $date) {
                    id
                    time
                    date
                    isTaken
                }
            }
            ${MedicationInfo}
            `;
export const MedicationSummary = gql`  
            fragment MedicationSummary on Medication {
                summary (date:$date, userId:$userId)  {
                    date
                    reportsNeeded
                    reports {
                        id
                        isTaken
                    }
                }
            }
            
        `;

export const MedicationsByType =gql`  
 fragment MedicationsByType on MedicationPlan {
    medicationsByType (date: $date) {
        takeAtTimes {
        ...MedicationCardInfo
            timesPerHour {
                id
                time
                quantity
            }
        }
        takeDaily {
        ...MedicationCardInfo
        }
        takeAsNeeded {
        ...MedicationCardInfo
        }
    } 
}
${MedicationCardInfo}
`;